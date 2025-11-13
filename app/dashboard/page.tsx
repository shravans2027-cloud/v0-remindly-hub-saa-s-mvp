"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { useState } from "react"
import { CreateReminderModal } from "@/components/create-reminder-modal"
import { DashboardChart } from "@/components/dashboard-chart"

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const stats = [
    { label: "Active Reminders", value: "12", icon: Clock, color: "text-primary", trend: "+2 this week" },
    { label: "Completed This Week", value: "28", icon: CheckCircle, color: "text-green-600", trend: "+12%" },
    { label: "Upcoming in 24H", value: "5", icon: AlertCircle, color: "text-orange-600", trend: "3 urgent" },
    { label: "Delivery Rate", value: "99.2%", icon: TrendingUp, color: "text-blue-600", trend: "+0.3%" },
  ]

  const upcomingReminders = [
    {
      id: 1,
      title: "Q4 Tax Filing",
      time: "3:00 PM",
      nextDate: "Dec 15, 2025",
      status: "scheduled",
      recipients: 3,
      priority: "high",
    },
    {
      id: 2,
      title: "Client Follow-up: ABC Corp",
      time: "10:00 AM",
      nextDate: "Dec 14, 2025",
      status: "scheduled",
      recipients: 1,
      priority: "medium",
    },
    {
      id: 3,
      title: "Invoice Payment Reminder",
      time: "2:00 PM",
      nextDate: "Dec 13, 2025",
      status: "sent",
      recipients: 3,
      priority: "low",
    },
    {
      id: 4,
      title: "Weekly Team Sync",
      time: "5:00 PM",
      nextDate: "Dec 16, 2025",
      status: "scheduled",
      recipients: 8,
      priority: "medium",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back! Here's your reminder overview.</p>
              </div>
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Reminder
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-3">{stat.trend}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <DashboardChart />
              </div>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-semibold">99.2%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "99.2%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">Avg Response Time</span>
                    <span className="font-semibold">42ms</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="font-semibold">100%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming Reminders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Reminders</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <Card key={reminder.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{reminder.title}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(reminder.priority)}`}
                          >
                            {reminder.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {reminder.nextDate} at {reminder.time} • {reminder.recipients} recipient
                          {reminder.recipients > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            reminder.status === "sent" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {reminder.status === "sent" ? "Sent" : "Scheduled"}
                        </span>
                        <Button variant="ghost" size="sm">
                          →
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreateReminderModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
