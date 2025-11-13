import { Redis } from "@upstash/redis"

let redis: Redis | null = null

const getRedis = (): Redis | null => {
  if (redis) return redis

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.warn("[v0] Redis not configured - queue service disabled")
    return null
  }

  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })

  return redis
}

interface ScheduledReminder {
  reminderId: string
  userId: string
  scheduledAt: string
  recipients: string[]
  message: string
  title: string
}

export class QueueService {
  static async enqueueReminder(reminder: ScheduledReminder) {
    const client = getRedis()
    if (!client) {
      console.log("[v0] Queue disabled, reminder not enqueued:", reminder.reminderId)
      return
    }

    const delayMs = new Date(reminder.scheduledAt).getTime() - Date.now()

    if (delayMs <= 0) {
      await client.lpush("reminders:immediate", JSON.stringify(reminder))
    } else {
      await client.zadd("reminders:scheduled", {
        score: new Date(reminder.scheduledAt).getTime(),
        member: JSON.stringify(reminder),
      })
    }
  }

  static async getPendingReminders() {
    const client = getRedis()
    if (!client) return []

    const reminders = await client.lrange("reminders:immediate", 0, -1)
    return reminders as string[]
  }

  static async getScheduledRemindersDueNow() {
    const client = getRedis()
    if (!client) return []

    const now = Date.now()
    const reminders = await client.zrange("reminders:scheduled", 0, now, { byScore: true })
    return reminders as string[]
  }

  static async removeFromQueue(reminderId: string) {
    const client = getRedis()
    if (!client) return

    await client.lrem("reminders:immediate", 1, reminderId)
  }

  static async addToDeadLetterQueue(reminder: ScheduledReminder, error: string) {
    const client = getRedis()
    if (!client) return

    await client.lpush("reminders:failed", JSON.stringify({ ...reminder, error, failedAt: new Date().toISOString() }))
  }
}
