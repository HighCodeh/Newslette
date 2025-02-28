"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!email.trim()) {
      setError("Por favor, informe um email válido.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError("Este email já está inscrito na newsletter.")
        } else {
          throw new Error(data.error || "Ocorreu um erro. Por favor, tente novamente.")
        }
      } else {
        setShowSuccess(true)
        setEmail("")
        setName("")
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setShowSuccess(false);
    setError(null);
    setEmail(""); // Garante que o campo de e-mail reseta
    setName("");  // Garante que o campo de nome reseta
  };

  return (
    <div className="w-full">
      {showSuccess ? (
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8c2aff]/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#8c2aff]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Inscrição confirmada!</h3>
          <p className="text-gray-300">Obrigado por se inscrever na nossa newsletter.</p>

        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 pointer-events-auto">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-black/40 border border-white/10 focus:border-[#8c2aff]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#8c2aff]/20 relative z-10"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                required
                className="w-full bg-black/40 border border-white/10 focus:border-[#8c2aff]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#8c2aff]/20 relative z-10"
              />
            </div>
          </div>

          {error && <div className="text-red-400 text-sm py-2 text-center">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full relative overflow-hidden group bg-gradient-to-r from-[#8c2aff] to-[#a35aff] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 ${isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(140,42,255,0.4)]"
              }`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isSubmitting ? "Processando..." : "Inscrever-se"}
            </span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade.
          </p>
        </form>
      )}
    </div>
  )
}

