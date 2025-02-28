"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DebugConnection() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/check-connection", {
        method: "GET",
      })

      const data = await response.json()

      if (response.ok) {
        setStatus(`Conexão OK: ${data.message}`)
      } else {
        setStatus(`Erro: ${data.error}`)
      }
    } catch (error) {
      setStatus(`Erro de conexão: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={checkConnection}
        disabled={loading}
        variant="outline"
        className="bg-purple-900/50 border-purple-700/50 text-white text-xs"
      >
        {loading ? "Verificando..." : "Verificar Conexão"}
      </Button>
      {status && <div className="mt-2 p-2 bg-black/80 text-white text-xs rounded">{status}</div>}
    </div>
  )
}

