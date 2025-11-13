import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return NextResponse.json({ user: data.user, session: data.session })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to login" }, { status: 401 })
  }
}
