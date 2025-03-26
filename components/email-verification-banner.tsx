"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import supabase from "@/lib/supabase";

export function EmailVerificationBanner() {
  const { user, refreshSession } = useAuth()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const resendVerificationEmail = async () => {
    if (!user?.email) return

    setIsSending(true)
    setMessage(null)

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage("Verification email sent! Please check your inbox.")
    }

    setIsSending(false)
  }

  return (
    <div className="bg-yellow-500 border-b-2 border-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="font-bold">Your email is not verified</p>
          <p className="text-sm">Please check your inbox and verify your email to access all features.</p>
        </div>
        <div className="mt-2 md:mt-0 flex flex-col items-center">
          <button onClick={resendVerificationEmail} disabled={isSending} className="mc-button-gray text-sm">
            {isSending ? "Sending..." : "Resend Verification Email"}
          </button>
          {message && <p className="text-xs mt-1">{message}</p>}
        </div>
      </div>
    </div>
  )
}

