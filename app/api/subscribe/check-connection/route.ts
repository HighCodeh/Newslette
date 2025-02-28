import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variáveis de ambiente ausentes na verificação de conexão")
    return NextResponse.json(
      {
        error: "Configuração do servidor incompleta",
        debug: {
          NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "definida" : "ausente",
          SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? "definida" : "ausente",
        },
      },
      { status: 500 },
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Teste a conexão com uma consulta simples
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("count", { count: "exact", head: true })

    if (error) {
      console.error("Erro na consulta ao Supabase:", error)
      return NextResponse.json(
        {
          error: `Erro de banco de dados: ${error.message}`,
          details: error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        message: "Conexão com Supabase estabelecida com sucesso",
        count: data,
        supabaseUrl: supabaseUrl.replace(/^(https?:\/\/)([^@]+@)?/, "$1"), // Remove credenciais, se presentes
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Erro ao conectar com Supabase:", error)
    return NextResponse.json(
      {
        error: `Erro ao conectar: ${error.message}`,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}

