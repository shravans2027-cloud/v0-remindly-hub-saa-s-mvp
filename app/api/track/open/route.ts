import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// Transparent 1x1 pixel for email open tracking
const PIXEL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const deliveryId = searchParams.get("delivery_id")

    if (deliveryId) {
      const supabase = await createClient()

      // Log the open event
      await supabase.from("activity_log").insert({
        action: "email_opened",
        resource_id: deliveryId,
        details: { timestamp: new Date().toISOString() },
      })
    }

    // Return 1x1 transparent PNG
    return new NextResponse(PIXEL_PNG, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Error tracking open:", error)
    return new NextResponse(PIXEL_PNG, {
      headers: { "Content-Type": "image/png" },
    })
  }
}
