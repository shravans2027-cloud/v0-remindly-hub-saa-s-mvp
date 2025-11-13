"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function IntegrationsPage() {
  const integrations = [
    {
      id: 1,
      name: "Stripe",
      description: "Billing and subscription management",
      status: "connected",
      icon: "💳",
    },
    {
      id: 2,
      name: "SendGrid",
      description: "Email delivery and tracking",
      status: "connected",
      icon: "📧",
    },
    {
      id: 3,
      name: "Google Calendar",
      description: "Calendar synchronization",
      status: "not_connected",
      icon: "📅",
    },
    {
      id: 4,
      name: "Slack",
      description: "Send reminders to Slack channels",
      status: "not_connected",
      icon: "💬",
    },
    {
      id: 5,
      name: "Zapier",
      description: "Connect to 3000+ apps",
      status: "not_connected",
      icon: "⚡",
    },
    {
      id: 6,
      name: "Twilio",
      description: "SMS and WhatsApp messaging",
      status: "not_connected",
      icon: "📱",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Integrations</h1>
              <p className="text-muted-foreground mb-8">Connect third-party services to enhance RemindlyHub</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <Card
                  key={integration.id}
                  className={`p-6 border-2 transition-colors ${
                    integration.status === "connected"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        integration.status === "connected" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {integration.status === "connected" ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                  <Button className="w-full gap-2" variant={integration.status === "connected" ? "outline" : "default"}>
                    {integration.status === "connected" ? "Manage" : "Connect"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
