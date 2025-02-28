import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variáveis de ambiente ausentes:", {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "definida" : "ausente",
      SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? "definida" : "ausente",
    })
    return NextResponse.json(
      {
        error: "Configuração do servidor incompleta. Entre em contato com o administrador.",
      },
      { status: 500 },
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 })
    }

    // Verificar se o email já existe
    const { data: existingUser, error: checkError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Erro ao verificar email existente:", checkError)
      return NextResponse.json({ error: "Erro ao verificar inscrição existente" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ error: "Este email já está inscrito" }, { status: 409 })
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email, name, subscribed_at: new Date().toISOString() }])

    if (insertError) {
      console.error("Erro Supabase ao inserir:", insertError)
      return NextResponse.json({ error: "Erro ao inscrever. Por favor, tente novamente." }, { status: 500 })
    }

    return NextResponse.json({ message: "Inscrito com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao processar inscrição:", error)
    return NextResponse.json({ error: "Falha na inscrição. Por favor, tente novamente." }, { status: 500 })
  }
}

