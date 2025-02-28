"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
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

      if (!response.ok) {
        throw new Error("Falha na requisição")
      }

      toast({
        title: "Sucesso!",
        description: "Você foi inscrito na nossa newsletter.",
      })

      setEmail("")
      setName("")
    } catch (error) {
      console.error("Erro ao inscrever:", error)
      toast({
        title: "Erro",
        description: "Não foi possível completar sua inscrição. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-purple-900/20 border-purple-700/50 text-white placeholder:text-gray-400"
          />
          <Input
            type="email"
            placeholder="Seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-purple-900/20 border-purple-700/50 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Inscrevendo..." : "Inscrever-se na Newsletter"}
        </Button>
      </form>
      <Toaster />
    </div>
  )
}

