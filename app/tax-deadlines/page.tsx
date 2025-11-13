"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TaxDeadlinesPage() {
  const [subscribedDeadlines, setSubscribedDeadlines] = useState<number[]>([1, 3])

  const taxDeadlines = [
    {
      id: 1,
      formCode: "1040",
      title: "Individual Income Tax Return",
      dueDate: "April 15, 2026",
      state: "ALL",
      entityType: "Individual",
      description: "Federal income tax return due for individuals",
    },
    {
      id: 2,
      formCode: "1120",
      title: "U.S. Corporation Income Tax Return",
      dueDate: "March 15, 2026",
      state: "ALL",
      entityType: "C-Corp",
      description: "Annual corporate tax return",
    },
    {
      id: 3,
      formCode: "1065",
      title: "Partnership/S-Corp Return",
      dueDate: "March 15, 2026",
      state: "ALL",
      entityType: "LLC/S-Corp",
      description: "Return of partnership income",
    },
    {
      id: 4,
      formCode: "1040-ES",
      title: "Estimated Tax Payment",
      dueDate: "December 16, 2025",
      state: "ALL",
      entityType: "Individual",
      description: "Quarterly estimated tax payment due",
    },
    {
      id: 5,
      formCode: "CA 540",
      title: "California Resident Income Tax Return",
      dueDate: "April 15, 2026",
      state: "CA",
      entityType: "Individual",
      description: "California state income tax return",
    },
    {
      id: 6,
      formCode: "NY IT-201",
      title: "New York Resident Income Tax Return",
      dueDate: "April 15, 2026",
      state: "NY",
      entityType: "Individual",
      description: "New York state income tax return",
    },
  ]

  const toggleSubscription = (id: number) => {
    setSubscribedDeadlines((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Tax Deadlines</h1>
              <p className="text-muted-foreground mt-1">Subscribe to key tax deadlines and get automatic reminders</p>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                placeholder="Search deadlines..."
                className="px-4 py-2 rounded-lg border border-border bg-input text-foreground text-sm"
              />
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option>All States</option>
                <option>Federal</option>
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option>All Entity Types</option>
                <option>Individual</option>
                <option>S-Corp</option>
                <option>C-Corp</option>
                <option>LLC</option>
              </select>
            </div>

            {/* Deadlines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taxDeadlines.map((deadline) => (
                <Card key={deadline.id} className="p-6 border-2 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-primary">{deadline.formCode}</p>
                      <h3 className="text-lg font-semibold mt-1">{deadline.title}</h3>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground">
                      {deadline.state === "ALL" ? "Federal" : `State: ${deadline.state}`}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{deadline.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-semibold">{deadline.dueDate}</p>
                    </div>
                    <Button
                      onClick={() => toggleSubscription(deadline.id)}
                      variant={subscribedDeadlines.includes(deadline.id) ? "default" : "outline"}
                      size="sm"
                    >
                      {subscribedDeadlines.includes(deadline.id) ? "Subscribed" : "Subscribe"}
                    </Button>
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
