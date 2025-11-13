import { createClient } from "@/lib/supabase/server"

export class ReminderService {
  static async createReminder(userId: string, reminderData: any) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("reminders")
      .insert({ user_id: userId, ...reminderData })
      .select()

    if (error) throw error
    return data[0]
  }

  static async updateReminder(userId: string, reminderId: string, updates: any) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("reminders")
      .update(updates)
      .eq("id", reminderId)
      .eq("user_id", userId)
      .select()

    if (error) throw error
    return data[0]
  }

  static async getUpcomingReminders(userId: string, days = 7) {
    const supabase = await createClient()
    const now = new Date()
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .gte("due_date", now.toISOString())
      .lte("due_date", future.toISOString())
      .order("due_date", { ascending: true })

    if (error) throw error
    return data
  }

  static async completeReminder(userId: string, reminderId: string) {
    return this.updateReminder(userId, reminderId, {
      status: "completed",
      updated_at: new Date().toISOString(),
    })
  }

  static async snoozeReminder(userId: string, reminderId: string, minutes: number) {
    const snoozeTime = new Date(Date.now() + minutes * 60 * 1000)
    return this.updateReminder(userId, reminderId, {
      reminder_time: snoozeTime.toISOString(),
    })
  }
}
