"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ01アイウエオカキクケコサシスセソタチツテトナニヌネノ"
    const fontSize = 18
    const columns = Math.floor(canvas.width / fontSize)

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    const draw = () => {
      ctx.fillStyle = "rgba(8, 10, 28, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gradient from cyan to blue
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Create glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = "#00d4ff"
        ctx.fillStyle = "#00d4ff"
        ctx.font = `bold ${fontSize}px monospace`
        ctx.fillText(text, x, y)

        // Random characters with pink accent
        if (Math.random() > 0.98) {
          ctx.shadowColor = "#ff0080"
          ctx.fillStyle = "#ff0080"
          ctx.fillText(text, x, y)
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 40)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundColor: "#08090a",
      }}
    />
  )
}
