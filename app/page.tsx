import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, Calendar, Clock, Zap, BarChart3, GitBranch } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">RemindlyHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6">
            Never Miss a <span className="text-primary">Business Deadline</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Automated reminders for tax deadlines, client follow-ups, and recurring business events. Stay organized,
            stay compliant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Smart Scheduling", desc: "Schedule reminders with flexible recurrence patterns" },
              { icon: Bell, title: "Multi-Channel", desc: "Email, SMS, and WhatsApp notifications" },
              { icon: Calendar, title: "Tax Deadlines", desc: "Pre-built US federal and state tax deadline reminders" },
              { icon: Zap, title: "Auto Reminders", desc: "Background jobs ensure reminders never fail" },
              { icon: BarChart3, title: "Analytics", desc: "Track delivery rates and engagement metrics" },
              { icon: GitBranch, title: "Integrations", desc: "Connect with Google Calendar and Stripe" },
            ].map((feature, i) => (
              <Card key={i} className="p-6 border border-border">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Free", price: "$0", features: ["Up to 10 reminders", "Email only", "Basic support"] },
            {
              name: "Pro",
              price: "$29",
              features: ["Unlimited reminders", "SMS & WhatsApp", "24/7 support", "Google Calendar"],
              highlight: true,
            },
            {
              name: "Agency",
              price: "$99",
              features: ["Team collaboration", "Advanced analytics", "Priority support", "Custom integrations"],
            },
          ].map((plan, i) => (
            <Card
              key={i}
              className={`p-8 border-2 ${plan.highlight ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}/mo</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RemindlyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
