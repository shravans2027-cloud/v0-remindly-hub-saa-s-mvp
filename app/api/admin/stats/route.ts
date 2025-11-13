import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get reminder stats
    const { count: totalReminders } = await supabase
      .from("reminders")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)

    const { count: completedReminders } = await supabase
      .from("reminders")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .eq("status", "completed")

    const { count: activeReminders } = await supabase
      .from("reminders")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .eq("status", "active")

    const { count: unreadNotifications } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .eq("read", false)

    return NextResponse.json({
      totalReminders: totalReminders || 0,
      completedReminders: completedReminders || 0,
      activeReminders: activeReminders || 0,
      unreadNotifications: unreadNotifications || 0,
      completionRate: totalReminders ? Math.round((completedReminders! / totalReminders) * 100) : 0,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch stats" },
      { status: 500 },
    )
  }
}
