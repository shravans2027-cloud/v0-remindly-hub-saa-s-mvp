"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Calendar, Settings, BarChart3, Users, Zap, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", icon: Bell, label: "Dashboard" },
  { href: "/reminders", icon: Calendar, label: "My Reminders" },
  { href: "/tax-deadlines", icon: BarChart3, label: "Tax Deadlines" },
  { href: "/automations", icon: Zap, label: "Automations" },
  { href: "/integrations", icon: Users, label: "Integrations" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between group">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && <span className="font-semibold truncate">RemindlyHub</span>}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E63946] transition-all font-medium shadow-md"
        >
          <BarChart3 className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Go to Dashboard</span>}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
