"use client";

import { useAuth } from "@/components/auth-provider";
import { ProtectedRoute } from "@/components/protected-route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for a session on component mount
  useEffect(() => {
    // Fetch the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Fetched session:", session); // Log the session
      setSession(session);
      setLoading(false); // Session check is complete
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session); // Log auth state changes
      setSession(session);
    });

    // Cleanup the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!loading && !session) {
      console.log("No session found, redirecting to login...");
      router.push("/login");
    }
  }, [session, loading, router]);

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // If the session is still loading or the user is not authenticated, render nothing
  if (loading || !session) {
    return null; // Render nothing until the session check is complete
  }

  return (
    <ProtectedRoute>
      <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full mc-panel">
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

          {/* Welcome Message and Sign Out Button */}
          <div className="mb-6 text-center">
            <p className="text-lg">Welcome, {session.user?.email}!</p>
            <button
              onClick={signOut}
              className="mt-2 mc-button-red"
            >
              Sign Out
            </button>
          </div>

          {/* Stats and Tools Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Your Stats Section */}
            <div className="bg-[#e0e0e0] p-4 border-2 border-black">
              <h2 className="text-xl font-bold mb-2">Your Stats</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Servers Joined:</span>
                  <span>12</span>
                </li>
                <li className="flex justify-between">
                  <span>Exploits Used:</span>
                  <span>5</span>
                </li>
                <li className="flex justify-between">
                  <span>Custom Skins:</span>
                  <span>3</span>
                </li>
              </ul>
            </div>

            {/* Available Tools Section */}
            <div className="bg-[#e0e0e0] p-4 border-2 border-black">
              <h2 className="text-xl font-bold mb-2">Available Tools</h2>
              <ul className="space-y-2">
                <li>
                  <button className="mc-button-green w-full text-left">Cross-Platform Connector</button>
                </li>
                <li>
                  <button className="mc-button-green w-full text-left">Custom Skin Loader</button>
                </li>
                <li>
                  <button className="mc-button-green w-full text-left">Server Browser</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Updates Section */}
          <div className="mt-8 bg-[#e0e0e0] p-4 border-2 border-black">
            <h2 className="text-xl font-bold mb-2">Recent Updates</h2>
            <div className="space-y-4">
              <div className="border-b border-black pb-2">
                <h3 className="font-bold">Version 2.1.0</h3>
                <p className="text-sm">Added support for the latest Minecraft update</p>
                <p className="text-xs text-gray-600">2 days ago</p>
              </div>
              <div className="border-b border-black pb-2">
                <h3 className="font-bold">Version 2.0.5</h3>
                <p className="text-sm">Fixed server connection issues</p>
                <p className="text-xs text-gray-600">1 week ago</p>
              </div>
              <div>
                <h3 className="font-bold">Version 2.0.0</h3>
                <p className="text-sm">Major update with new UI and features</p>
                <p className="text-xs text-gray-600">3 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}