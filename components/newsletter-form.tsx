"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Por favor, informe seu email.")
      toast({
        title: "Erro",
        description: "Por favor, informe seu email.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha na requisição")
      }

      setSuccess(true)
      toast({
        title: "Sucesso!",
        description: "Você foi inscrito na nossa newsletter.",
      })

      setEmail("")
      setName("")
    } catch (error: any) {
      console.error("Erro ao inscrever:", error)
      setError(error.message || "Erro desconhecido")
      toast({
        title: "Erro",
        description: error.message || "Não foi possível completar sua inscrição. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {success ? (
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Inscrição Confirmada!</h3>
          <p className="text-gray-300 mb-4">
            Obrigado por se inscrever na nossa newsletter. Você receberá as novidades em breve!
          </p>
          <Button onClick={() => setSuccess(false)} className="bg-purple-600 hover:bg-purple-700">
            Inscrever outro email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-purple-900/20 border-purple-700/50 text-white placeholder:text-gray-400 h-12"
              disabled={loading}
            />
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-purple-900/20 border-purple-700/50 text-white placeholder:text-gray-400 h-12"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700/50 text-red-200 p-3 rounded-md text-sm">{error}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors h-12"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inscrevendo...
              </>
            ) : (
              "Inscrever-se na Newsletter"
            )}
          </Button>
        </form>
      )}
      <Toaster />
    </div>
  )
}

