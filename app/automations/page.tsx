"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Zap } from "lucide-react"

export default function AutomationsPage() {
  const automations = [
    {
      id: 1,
      name: "Tax Deadline Auto-Reminders",
      description: "Automatically create reminders 30 days before each tax deadline",
      status: "active",
      lastRun: "2 hours ago",
    },
    {
      id: 2,
      name: "Invoice Follow-ups",
      description: "Send follow-up reminders 7, 14, and 30 days after invoice creation",
      status: "active",
      lastRun: "1 day ago",
    },
    {
      id: 3,
      name: "Weekly Team Syncs",
      description: "Automatically schedule weekly Monday team meetings at 9 AM",
      status: "paused",
      lastRun: "Last week",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Automations</h1>
                <p className="text-muted-foreground mt-1">Create rules to automatically generate reminders</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Automation
              </Button>
            </div>

            <div className="space-y-4">
              {automations.map((automation) => (
                <Card key={automation.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{automation.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{automation.description}</p>
                      <p className="text-xs text-muted-foreground">Last run: {automation.lastRun}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          automation.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {automation.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        •••
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
