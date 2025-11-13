import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
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
    const { data, error } = await supabase
      .from("reminders")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()

    if (error) throw error

    // Log activity
    await ActivityService.logActivity(user.id, "reminder_completed", "reminder", id)

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to complete reminder" },
      { status: 500 },
    )
  }
}
