"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null = null

/**
 * Get or create the singleton Supabase browser client
 * This ensures only one client instance exists across the entire app
 */
export function createClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null
  }

  if (supabaseClient) {
    return supabaseClient
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  try {
    supabaseClient = createBrowserClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false, // disable URL detection to reduce client creation
      },
    })
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    return null
  }

  return supabaseClient
}

export function getClient(): SupabaseClient | null {
  return createClient()
}
