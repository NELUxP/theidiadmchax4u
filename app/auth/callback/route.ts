// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      // Exchange the code for a session (for email confirmation)
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
      }

      // Successfully exchanged code for session
      console.log("Session data:", data);
    } catch (err) {
      console.error("Unexpected error:", err);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=unexpected_error`);
    }
  }

  // Redirect to the dashboard or home page after successful email confirmation
  return NextResponse.redirect(`${requestUrl.origin}/download`);
}