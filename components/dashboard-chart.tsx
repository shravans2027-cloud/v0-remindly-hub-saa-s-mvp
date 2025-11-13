"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const chartData = [
  { time: "00:00", active: 8, sent: 12, failed: 1 },
  { time: "04:00", active: 10, sent: 14, failed: 0 },
  { time: "08:00", active: 14, sent: 20, failed: 1 },
  { time: "12:00", active: 18, sent: 28, failed: 2 },
  { time: "16:00", active: 16, sent: 24, failed: 0 },
  { time: "20:00", active: 12, sent: 18, failed: 1 },
  { time: "24:00", active: 9, sent: 15, failed: 0 },
]

export function DashboardChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg">Reminder Activity</h3>
          <p className="text-sm text-muted-foreground">24-hour overview</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
          <YAxis stroke="hsl(var(--color-muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Area type="monotone" dataKey="active" stroke="hsl(var(--color-primary))" fill="url(#colorActive)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
