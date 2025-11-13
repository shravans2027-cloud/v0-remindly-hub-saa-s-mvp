import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const TAX_DEADLINES = [
  {
    title: "Federal 941 Quarterly Payroll Tax",
    description: "Employer quarterly federal income tax withholding",
    due_date: "2025-04-30",
    deadline_type: "federal",
    entity_type: "all",
    state: "ALL",
  },
  {
    title: "State Income Tax Quarterly - California",
    description: "California quarterly estimated tax payment",
    due_date: "2025-04-15",
    deadline_type: "state",
    entity_type: "all",
    state: "CA",
  },
  {
    title: "Sales Tax Monthly - New York",
    description: "New York monthly sales tax return",
    due_date: "2025-05-31",
    deadline_type: "state",
    entity_type: "all",
    state: "NY",
  },
  {
    title: "Partnership Return Filing",
    description: "U.S. Return of Partnership Income",
    due_date: "2025-03-15",
    deadline_type: "federal",
    entity_type: "partnership",
    state: "ALL",
  },
  {
    title: "S-Corporation Tax Return",
    description: "S-Corporation income tax return",
    due_date: "2025-03-15",
    deadline_type: "federal",
    entity_type: "s-corp",
    state: "ALL",
  },
  {
    title: "C-Corporation Tax Return",
    description: "U.S. Corporation income tax return",
    due_date: "2025-03-15",
    deadline_type: "federal",
    entity_type: "c-corp",
    state: "ALL",
  },
  {
    title: "Self-Employment Tax",
    description: "Self-employment tax with income tax return",
    due_date: "2025-04-15",
    deadline_type: "federal",
    entity_type: "sole-prop",
    state: "ALL",
  },
  {
    title: "Form 1099 Reporting",
    description: "1099 forms must be filed and sent to recipients",
    due_date: "2025-01-31",
    deadline_type: "federal",
    entity_type: "all",
    state: "ALL",
  },
]

async function seed() {
  try {
    console.log("Seeding tax deadlines...")

    const { error } = await supabase.from("tax_deadlines").insert(TAX_DEADLINES)

    if (error) throw error

    console.log(`✅ Successfully seeded ${TAX_DEADLINES.length} tax deadlines`)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    process.exit(1)
  }
}

seed()
