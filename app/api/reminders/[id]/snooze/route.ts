import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { QueueService } from "@/lib/services/queue-service"

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
    const { minutes } = await request.json()

    const snoozeTime = new Date(Date.now() + minutes * 60 * 1000)
    const { data, error } = await supabase
      .from("reminders")
      .update({ due_date: snoozeTime.toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()

    if (error) throw error

    // Re-queue the reminder
    const reminder = data[0]
    await QueueService.enqueueReminder({
      reminderId: reminder.id,
      userId: user.id,
      scheduledAt: reminder.due_date,
      recipients: [user.email!],
      message: reminder.description || "",
      title: reminder.title,
    })

    return NextResponse.json(reminder)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to snooze reminder" },
      { status: 500 },
    )
  }
}
