"use client";

import { useAuth } from "@/components/auth-provider";
import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

export function ProfilePopover() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="fixed top-2 right-1 z-50">
        <Link href="/login" className="mc-button-green flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>Login</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed top-2 right-1 z-50" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mc-button-green flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-256 mc-panel bg-[#2d2d2d] border border-[#424242] rounded-lg shadow-lg">
          <div className="p-4">
            {/* User Info */}
            <div className="flex flex-col gap-2">
              <div className="text-sm font-bold text-white">
              Profile: {user.user_metadata.username || "User"}
              </div>
              <div className="text-xs font-bold text-gray-400 truncate">
               Email: {user.email}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#424242] my-2"></div>

            {/* Menu Links */}
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full text-left text-sm text-white hover:bg-[#424242] p-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}