import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = "https://your-project-id.supabase.co"
const supabaseKey = "your-actual-service-role-key"

console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Key:", supabaseKey ? "[REDACTED]" : "undefined")

let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log("Supabase client created successfully")
  } catch (error) {
    console.error("Error creating Supabase client:", error)
  }
} else {
  console.error("Missing Supabase environment variables")
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 })
  }

  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email, name, subscribed_at: new Date().toISOString() }])

    if (error) throw error

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error subscribing:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

