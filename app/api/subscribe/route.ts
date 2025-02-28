import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        error: "Missing environment variables",
        vars: {
          url: supabaseUrl ? "✓" : "✗",
          key: supabaseKey ? "✓" : "✗",
        },
      },
      { status: 500 },
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Verificar se o email já existe
    const { data: existingUser } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "Este email já está inscrito" }, { status: 409 })
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email, name, subscribed_at: new Date().toISOString() }])

    if (error) {
      console.error("Erro Supabase:", error)
      return NextResponse.json({ error: `Erro ao inscrever: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ message: "Inscrito com sucesso" }, { status: 200 })
  } catch (error: any) {
    console.error("Erro ao processar inscrição:", error)
    return NextResponse.json({ error: `Falha na inscrição: ${error.message}` }, { status: 500 })
  }
}

