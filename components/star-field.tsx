"use client"

import { useEffect, useRef } from "react"

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Criar estrelas
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 1000)

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: 0.1 + Math.random() * 0.3,
      })
    }

    // Animar estrelas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fundo gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0f0326")
      gradient.addColorStop(1, "#1a0536")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Desenhar estrelas
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Mover estrelas
        star.y += star.speed

        // Reposicionar estrelas que saem da tela
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}

