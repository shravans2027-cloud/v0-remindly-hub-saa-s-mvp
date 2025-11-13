"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: false,
    timezone: "America/New_York",
    language: "English",
    googleCalendarConnected: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {/* Notification Preferences */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive reminders via email" },
                  { key: "smsNotifications", label: "SMS Notifications", desc: "Receive reminders via SMS" },
                  {
                    key: "whatsappNotifications",
                    label: "WhatsApp Notifications",
                    desc: "Receive reminders via WhatsApp",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings[item.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                          settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Regional Settings */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Regional Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select
                    name="timezone"
                    value={settings.timezone}
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
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Integrations */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Integrations</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-muted-foreground">Push reminders to your Google Calendar</p>
                  </div>
                  <Button variant={settings.googleCalendarConnected ? "outline" : "default"}>
                    {settings.googleCalendarConnected ? "Disconnect" : "Connect"}{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Account */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Account</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Download Data
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
