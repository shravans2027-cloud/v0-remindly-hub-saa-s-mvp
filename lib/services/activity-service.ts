import { createClient } from "@/lib/supabase/server"

export class ActivityService {
  static async logActivity(userId: string, action: string, resourceType?: string, resourceId?: string, details?: any) {
    const supabase = await createClient()
    const { error } = await supabase.from("activity_log").insert({
      user_id: userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details,
    })

    if (error) throw error
  }

  static async getRecentActivity(userId: string, limit = 10) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("activity_log")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
