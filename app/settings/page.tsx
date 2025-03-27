"use client";

import { useAuth } from "@/components/auth-provider";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function SettingsPage() {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return null;
  }

  return (
    <div className="min-h-screen mc-panel bg-[#2d2d2d] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

        {/* Account Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
          <div className="mc-panel p-6 rounded-lg">
            <div>
              <h3 className="text-lg font-medium text-white">Account Information</h3>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 