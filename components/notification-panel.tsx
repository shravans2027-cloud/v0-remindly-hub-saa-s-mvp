"use client"

import { X, Bell, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface Notification {
  id: number
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "success",
    title: "Tax Reminder Sent",
    message: "Q4 tax filing reminder sent to 3 recipients",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "High Failure Rate",
    message: "Invoice reminder has 15% delivery failures",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Reminder Updated",
    message: "Weekly team sync reminder rescheduled",
    timestamp: "1 hour ago",
    read: true,
  },
]

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(notifications)

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-blue-600" />
    }
  }

  const markAllAsRead = () => {
    setItems(items.map((item) => ({ ...item, read: true })))
  }

  const clearAll = () => {
    setItems([])
  }

  return (
    <Card className="absolute top-16 right-6 w-96 shadow-xl z-50 max-h-[500px] overflow-y-auto">
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={onClose} className="p-1 hover:bg-secondary rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {items.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${
              !notification.read ? "bg-primary/5" : ""
            }`}
          >
            <div className="flex gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3 flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={markAllAsRead}>
          Mark all as read
        </Button>
        <Button size="sm" variant="ghost" className="flex-1" onClick={clearAll}>
          Clear all
        </Button>
      </div>
    </Card>
  )
}
