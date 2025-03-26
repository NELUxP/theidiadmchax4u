"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    match: false
  });
  const { signUp } = useAuth();
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    
    setPasswordRequirements({
      ...passwordRequirements,
      length: val.length >= 8,
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /\d/.test(val),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(val)
    });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    setPasswordRequirements({
      ...passwordRequirements,
      match: password === val
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (username.includes(" ")) {
      setError("Username cannot contain spaces");
      setIsLoading(false);
      return;
    }

    if (!passwordRequirements.length || 
        !passwordRequirements.uppercase || 
        !passwordRequirements.lowercase || 
        !passwordRequirements.number || 
        !passwordRequirements.specialChar) {
      setError("Password does not meet requirements");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, username);
      if (error) {
        setError(error.message);
      } else {
        setIsRegistered(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mc-panel">
          <h1 className="text-2xl font-bold mb-6 text-center">Registration Successful!</h1>

          <div className="bg-green-500/20 p-4 mb-6 border-2 border-black">
            <p className="font-bold mb-2">Please check your email</p>
            <p>
              We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to
              verify your email address.
            </p>
          </div>

          <div className="space-y-4">
            <p>After verifying your email, you can log in to access the dashboard.</p>

            <div className="flex justify-center">
              <Link href="/login" className="mc-button-green">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="w-full max-w-md mc-panel">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && <div className="bg-red-500 text-white p-3 mb-4 border-2 border-black">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-bold">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mc-input"
              pattern="^\S+$"
              title="Username cannot contain spaces"
            />
          </div>

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

          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-bold">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full mc-input"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <div className="mt-2 text-xs">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5">
                <li className={passwordRequirements.length ? "text-green-500" : "text-red-500"}>
                  At least 8 characters
                </li>
                <li className={passwordRequirements.uppercase ? "text-green-500" : "text-red-500"}>
                  One uppercase letter
                </li>
                <li className={passwordRequirements.lowercase ? "text-green-500" : "text-red-500"}>
                  One lowercase letter
                </li>
                <li className={passwordRequirements.number ? "text-green-500" : "text-red-500"}>
                  One number
                </li>
                <li className={passwordRequirements.specialChar ? "text-green-500" : "text-red-500"}>
                  One special character
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 font-bold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full mc-input"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-9 text-xs"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {confirmPassword && (
              <div className={`mt-1 text-xs ${passwordRequirements.match ? "text-green-500" : "text-red-500"}`}>
                {passwordRequirements.match ? "✓ Passwords match" : "✗ Passwords do not match"}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full mc-button-green"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3e8e2f] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}