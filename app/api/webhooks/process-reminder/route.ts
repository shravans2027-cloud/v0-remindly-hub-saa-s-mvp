import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { EmailService } from "@/lib/services/email-service"
import { QueueService } from "@/lib/services/queue-service"

// Process scheduled reminders (called by cron or scheduler)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get reminders due now
    const pendingReminders = await QueueService.getPendingReminders()

    for (const reminderJson of pendingReminders) {
      const reminder = JSON.parse(reminderJson) // Declare the reminder variable here

      try {
        // Send email
        await EmailService.sendReminder({
          to: reminder.recipients,
          subject: reminder.title,
          message: reminder.message,
          title: reminder.title,
          reminderId: reminder.reminderId,
        })

        // Update reminder status
        await supabase
          .from("reminders")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", reminder.reminderId)

        // Create activity log
        await supabase.from("activity_log").insert({
          user_id: reminder.userId,
          action: "reminder_sent",
          resource_id: reminder.reminderId,
          details: { recipients: reminder.recipients },
        })

        // Remove from queue
        await QueueService.removeFromQueue(reminder.reminderId)
      } catch (error) {
        console.error("[v0] Error processing reminder:", error)
        // Add to dead letter queue for retry
        await QueueService.addToDeadLetterQueue(reminder, error instanceof Error ? error.message : "Unknown error")
      }
    }

    return NextResponse.json({ success: true, processed: pendingReminders.length })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process reminders" },
      { status: 500 },
    )
  }
}
