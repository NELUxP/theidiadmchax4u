"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user, signIn } = useAuth() // Get user and signIn from useAuth
  const router = useRouter()

  // Redirect to /download if the user is already signed in
  useEffect(() => {
    if (user) {
      router.push("/download")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        router.push("/download") // Redirect to /download after successful login
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="w-full max-w-md mc-panel">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <div className="bg-red-500 text-white p-3 mb-4 border-2 border-black">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mc-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mc-input"
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full mc-button-green">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#3e8e2f] hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}