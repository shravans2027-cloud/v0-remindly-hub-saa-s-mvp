import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { EmailService } from "@/lib/services/email-service"
import { ActivityService } from "@/lib/services/activity-service"
import { getConfig } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const config = getConfig()
    const authHeader = request.headers.get("authorization")
    const isDevMode = config.auth.cronSecret === "dev-cron-secret-change-in-production"

    if (!isDevMode && authHeader !== `Bearer ${config.auth.cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    const now = new Date()
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000)

    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*, profiles!inner(first_name, id)")
      .eq("status", "active")
      .gte("due_date", now.toISOString())
      .lte("due_date", fiveMinutesFromNow.toISOString())

    if (error) throw error

    let processed = 0
    let failed = 0

    for (const reminder of reminders || []) {
      try {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", reminder.user_id).single()

        const { data: user } = await supabase.auth.admin.getUserById(reminder.user_id)

        if (!user?.email) throw new Error("User email not found")

        await EmailService.sendReminder({
          to: [user.email],
          subject: reminder.title,
          message: reminder.description || "You have a reminder scheduled.",
          title: reminder.title,
          reminderId: reminder.id,
        })

        await supabase
          .from("reminders")
          .update({ status: "sent", updated_at: new Date().toISOString() })
          .eq("id", reminder.id)

        await ActivityService.logActivity(reminder.user_id, "reminder_sent", "reminder", reminder.id, {
          sentAt: new Date().toISOString(),
        })

        processed++
      } catch (err) {
        console.error("[v0] Failed to process reminder:", err)
        failed++

        await supabase
          .from("reminders")
          .update({ status: "failed", updated_at: new Date().toISOString() })
          .eq("id", reminder.id)
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      failed,
      total: reminders?.length || 0,
    })
  } catch (error) {
    console.error("[v0] Cron error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Cron job failed" }, { status: 500 })
  }
}
