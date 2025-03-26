"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { EmailVerificationBanner } from "@/components/email-verification-banner"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isEmailVerified } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="mc-panel">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      {!isEmailVerified && <EmailVerificationBanner />}
      {isEmailVerified ? (
        children
      ) : (
        <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-md mc-panel">
            <h1 className="text-2xl font-bold mb-4 text-center">Email Verification Required</h1>
            <p className="mb-4">
              You need to verify your email address before accessing the dashboard. Please check your inbox for a
              verification email.
            </p>
            <p className="mb-4">
              If you don't see the email, check your spam folder or request a new verification email.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

