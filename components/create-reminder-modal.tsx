"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface CreateReminderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateReminderModal({ open, onOpenChange }: CreateReminderModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipients: "",
    dateTime: "",
    timezone: "America/New_York",
    recurrence: "none",
    channel: "email",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Create reminder:", formData)
    alert("Reminder created successfully!")
    setFormData({
      title: "",
      message: "",
      recipients: "",
      dateTime: "",
      timezone: "America/New_York",
      recurrence: "none",
      channel: "email",
    })
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Reminder</h2>
          <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Reminder Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Q4 Tax Filing"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Detailed reminder message..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recipients (comma-separated emails)</label>
            <input
              type="text"
              name="recipients"
              value={formData.recipients}
              onChange={handleChange}
              placeholder="john@example.com, jane@example.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option>America/New_York</option>
                <option>America/Chicago</option>
                <option>America/Denver</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
                <option>Europe/Paris</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Recurrence</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Channel</label>
              <select
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Reminder
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
