import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

const TAX_DEADLINES = [
  {
    title: "Federal 941 Quarterly Payroll Tax",
    form_code: "Form 941",
    due_date: "2025-04-30",
    state: "ALL",
    entity_type: "all",
    description: "Employer quarterly federal income tax withholding",
  },
  {
    title: "State Income Tax Quarterly",
    form_code: "State Quarterly",
    due_date: "2025-04-15",
    state: "CA",
    entity_type: "all",
    description: "California quarterly estimated tax payment",
  },
  {
    title: "Sales Tax Return",
    form_code: "Sales Tax",
    due_date: "2025-05-31",
    state: "NY",
    entity_type: "all",
    description: "New York monthly sales tax return",
  },
  {
    title: "Partnership Return Filing",
    form_code: "Form 1065",
    due_date: "2025-03-15",
    state: "ALL",
    entity_type: "partnership",
    description: "U.S. Return of Partnership Income",
  },
  {
    title: "S-Corporation Tax Return",
    form_code: "Form 1120-S",
    due_date: "2025-03-15",
    state: "ALL",
    entity_type: "s-corp",
    description: "S-Corporation income tax return",
  },
  {
    title: "LLC Tax Return",
    form_code: "Form 1040",
    due_date: "2025-04-15",
    state: "ALL",
    entity_type: "llc",
    description: "LLC member individual tax return",
  },
  {
    title: "Corporate Tax Return",
    form_code: "Form 1120",
    due_date: "2025-03-15",
    state: "ALL",
    entity_type: "c-corp",
    description: "U.S. Corporation income tax return",
  },
  {
    title: "Self-Employment Tax",
    form_code: "Schedule SE",
    due_date: "2025-04-15",
    state: "ALL",
    entity_type: "sole-prop",
    description: "Self-employment tax with income tax return",
  },
]

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin (in production, verify against admin table)
    const { error: seedError } = await supabase.from("tax_deadlines").insert(
      TAX_DEADLINES.map((deadline) => ({
        user_id: user.id,
        title: deadline.title,
        description: deadline.description,
        due_date: deadline.due_date,
        deadline_type: "tax",
        entity_type: deadline.entity_type,
        state: deadline.state,
        is_subscribed: true,
      })),
    )

    if (seedError) throw seedError

    return NextResponse.json({ success: true, seeded: TAX_DEADLINES.length })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to seed data" }, { status: 500 })
  }
}
