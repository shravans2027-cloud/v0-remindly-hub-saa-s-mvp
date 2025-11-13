import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/services/email-service"
import { ActivityService } from "@/lib/services/activity-service"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { data: reminder, error: fetchError } = await supabase
      .from("reminders")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (fetchError) throw fetchError

    // Send email immediately
    await EmailService.sendReminder({
      to: [user.email!],
      subject: reminder.title,
      message: reminder.description || "You have a reminder waiting for you.",
      title: reminder.title,
      reminderId: id,
    })

    // Log activity
    await ActivityService.logActivity(user.id, "reminder_sent_manual", "reminder", id)

    return NextResponse.json({ success: true, message: "Reminder sent" })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send reminder" },
      { status: 500 },
    )
  }
}
