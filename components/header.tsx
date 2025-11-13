"use client"

import { Bell, Search, Moon, Sun, User, Settings } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationPanel } from "./notification-panel"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reminders, tax deadlines..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
              {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
            </div>

            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
