"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"
import { CreateReminderModal } from "@/components/create-reminder-modal"

export default function RemindersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const allReminders = [
    {
      id: 1,
      title: "Q4 Tax Filing",
      message: "Reminder to file Q4 taxes",
      nextDate: "Dec 15, 2025",
      time: "3:00 PM",
      status: "scheduled",
      recurrence: "yearly",
      recipients: 2,
      deliveryRate: "100%",
      priority: "high",
    },
    {
      id: 2,
      title: "Client Follow-up: ABC Corp",
      message: "Follow up on proposal",
      nextDate: "Dec 14, 2025",
      time: "10:00 AM",
      status: "scheduled",
      recurrence: "weekly",
      recipients: 1,
      deliveryRate: "98%",
      priority: "medium",
    },
    {
      id: 3,
      title: "Invoice Payment Reminder",
      message: "Friendly payment reminder",
      nextDate: "Dec 13, 2025",
      time: "2:00 PM",
      status: "sent",
      recurrence: "daily",
      recipients: 3,
      deliveryRate: "99%",
      priority: "low",
    },
    {
      id: 4,
      title: "Weekly Team Sync",
      message: "Team meeting reminder",
      nextDate: "Dec 16, 2025",
      time: "5:00 PM",
      status: "scheduled",
      recurrence: "weekly",
      recipients: 8,
      deliveryRate: "100%",
      priority: "medium",
    },
    {
      id: 5,
      title: "Contract Renewal Deadline",
      message: "Review contract terms",
      nextDate: "Dec 20, 2025",
      time: "9:00 AM",
      status: "scheduled",
      recurrence: "none",
      recipients: 2,
      deliveryRate: "97%",
      priority: "high",
    },
  ]

  const filteredReminders = allReminders.filter(
    (r) =>
      (filterStatus === "all" || r.status === filterStatus) &&
      (r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.message.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">My Reminders</h1>
                <p className="text-muted-foreground mt-1">Manage all your scheduled reminders</p>
              </div>
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Reminder
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search reminders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "scheduled" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("scheduled")}
                >
                  Scheduled
                </Button>
                <Button
                  variant={filterStatus === "sent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("sent")}
                >
                  Sent
                </Button>
              </div>
            </div>

            {/* Reminders Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Next Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Recurrence</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Recipients</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Delivery</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredReminders.map((reminder) => (
                      <tr key={reminder.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{reminder.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{reminder.message}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div>
                            {reminder.nextDate}
                            <span className="block text-muted-foreground">{reminder.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              reminder.status === "sent" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {reminder.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm capitalize">{reminder.recurrence}</td>
                        <td className="px-6 py-4 text-sm font-medium">{reminder.recipients}</td>
                        <td className="px-6 py-4 text-sm font-medium">{reminder.deliveryRate}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Empty State */}
            {filteredReminders.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No reminders found. Create your first reminder to get started.</p>
              </Card>
            )}
          </div>
        </main>
      </div>

      <CreateReminderModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
