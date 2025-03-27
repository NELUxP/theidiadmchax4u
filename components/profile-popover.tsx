"use client";

import { useAuth } from "@/components/auth-provider";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProfilePopover() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Link 
          href="/login" 
          className="mc-button-green flex items-center gap-2 px-4 py-2 hover:bg-[#3e8e2f]/90 transition-colors"
        >
          <User className="w-4 h-4" />
          <span className="text-sm">Login</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-0 z-50" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="mc-button-green flex items-center gap-2 px-4 py-2 hover:bg-[#3e8e2f]/90 transition-colors"
        whileHover={{ x: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-4 h-4" />
        <span className="text-sm">Profile</span>
      </motion.button>

      {/* Sliding Menu */}
      <motion.div
        className="fixed top-0 right-0 h-screen w-64 mc-panel bg-[#2d2d2d] border-l border-[#424242] shadow-lg"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-4 p-2 hover:bg-[#3e8e2f]/20 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* User Info Section */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#3e8e2f] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">
                  {user.user_metadata.username || "User"}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#424242] my-2" />

          {/* Menu Items */}
          <div className="space-y-1 flex-1">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-sm text-white hover:bg-[#3e8e2f]/20 p-2 rounded transition-colors whitespace-nowrap overflow-hidden"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </Link>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-sm text-white hover:bg-[#3e8e2f]/20 p-2 rounded transition-colors whitespace-nowrap overflow-hidden"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}