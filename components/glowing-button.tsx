"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface GlowingButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function GlowingButton({ children, className, onClick }: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative group px-7 py-4 bg-black text-white rounded-lg cursor-pointer flex items-center justify-center",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 -z-10",
          isHovered ? "animate-glow" : "",
        )}
      />
      {children}
    </div>
  )
}
