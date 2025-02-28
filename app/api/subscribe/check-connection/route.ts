import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { 
        error: "Missing environment variables", 
        vars: {
          url: supabaseUrl ? "✓" : "✗",
          key: supabaseKey ? "✓" : "✗"
        }
      }, 
      { status: 500 }
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test the connection with a simple query
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("count", { count: "exact", head: true })
    
    if (error) {
      return NextResponse.json(
        { 
          error: `Database error: ${error.message}`,
          details: error
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: "Conexão com Supabase estabelecida com sucesso",
        count: data,
        supabaseUrl: supabaseUrl.replace(/^(https?:\/\/)([^@]+@)?/, '$1'),  // Remove any credentials if present
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: `Erro ao conectar: ${error.message}`,
        stack: error.stack
      },
      { status: 500 }
    )
  }
}