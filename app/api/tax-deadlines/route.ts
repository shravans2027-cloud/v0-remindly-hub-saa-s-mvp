import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// GET all tax deadlines
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const state = searchParams.get("state")
    const entityType = searchParams.get("entityType")

    let query = supabase
      .from("tax_deadlines")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_subscribed", true)
      .order("due_date", { ascending: true })

    if (state) query = query.eq("state", state)
    if (entityType) query = query.eq("entity_type", entityType)

    const { data, error } = await query

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch tax deadlines" },
      { status: 500 },
    )
  }
}

// POST subscribe to tax deadline
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { data, error } = await supabase
      .from("tax_deadlines")
      .insert({
        user_id: user.id,
        ...body,
      })
      .select()

    if (error) throw error
    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to subscribe to tax deadline" },
      { status: 500 },
    )
  }
}
