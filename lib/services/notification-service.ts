import { createClient } from "@/lib/supabase/server"

export class NotificationService {
  static async createNotification(userId: string, type: string, message: string, reminderId?: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        notification_type: type,
        message,
        reminder_id: reminderId,
      })
      .select()

    if (error) throw error
    return data[0]
  }

  static async markAsRead(userId: string, notificationId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("notifications")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", notificationId)
      .eq("user_id", userId)
      .select()

    if (error) throw error
    return data[0]
  }

  static async getUnreadCount(userId: string) {
    const supabase = await createClient()
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .eq("read", false)

    if (error) throw error
    return count || 0
  }
}
