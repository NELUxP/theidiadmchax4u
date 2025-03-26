"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-white p-2 rounded-md shadow-md"
    >
      {theme === "dark" ? <Moon className="h-5 w-5 text-gray-700" /> : <Sun className="h-5 w-5 text-gray-700" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

