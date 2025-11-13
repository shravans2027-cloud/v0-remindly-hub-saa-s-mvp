import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { QueueService } from "@/lib/services/queue-service"

// GET all reminders for user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = supabase.from("reminders").select("*").eq("user_id", user.id).order("due_date", { ascending: true })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch reminders" },
      { status: 500 },
    )
  }
}

// POST create reminder
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { data, error } = await supabase
      .from("reminders")
      .insert({
        user_id: user.id,
        status: "scheduled",
        ...body,
      })
      .select()

    if (error) throw error

    const reminder = data[0]
    await QueueService.enqueueReminder({
      reminderId: reminder.id,
      userId: user.id,
      scheduledAt: reminder.due_date,
      recipients: body.recipients || [user.email],
      message: body.message,
      title: body.title,
    })

    return NextResponse.json(reminder, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create reminder" },
      { status: 500 },
    )
  }
}
