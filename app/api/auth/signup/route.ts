import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/services/email-service"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { email, password, firstName, lastName } = await request.json()

    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.APP_URL}/auth/callback`,
      },
    })

    if (authError) throw authError

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user!.id,
      first_name: firstName,
      last_name: lastName,
    })

    if (profileError) throw profileError

    // Send welcome email
    await EmailService.sendWelcome(email, firstName)

    return NextResponse.json({ user: authData.user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to sign up" }, { status: 500 })
  }
}
