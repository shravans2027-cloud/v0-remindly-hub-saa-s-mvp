"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "./client"

const SupabaseContext = createContext<SupabaseClient | null>(null)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const client = createClient()

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  return useContext(SupabaseContext)
}
