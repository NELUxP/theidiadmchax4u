"use client";

import { useAuth } from "@/components/auth-provider";
import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/login" 
          className="mc-button-green flex items-center gap-2 px-4 py-2 transition-all hover:scale-[1.02] active:scale-95"
        >
          <User className="w-4 h-4" />
          <span className="text-sm">Login</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed top-4 right-2 z-50"
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Slider-style Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="mc-button-green flex items-center justify-end gap-2 px-3 py-1.5 relative overflow-hidden"
        style={{ originX: 1 }}
        whileHover={{ width: 100 }}
        whileTap={{ scale: 0.95 }}
        initial={{ width: 40 }}
        animate={{ width: isOpen ? 100 : 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Smooth color flow effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(
              45deg,
              #${Math.floor(Math.random()*16777215).toString(16)},
              #${Math.floor(Math.random()*16777215).toString(16)},
              #${Math.floor(Math.random()*16777215).toString(16)},
              #${Math.floor(Math.random()*16777215).toString(16)}
            )`,
            backgroundSize: '400% 400%',
            filter: 'blur(8px)'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2 rounded-md px-2 py-1">
          <motion.div
            className="w-3.5 h-3.5 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <User className="w-full h-full text-white" />
          </motion.div>
          <motion.span 
            className="text-xs whitespace-nowrap text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Profile
          </motion.span>
        </div>
      </motion.button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12 right-0 w-64 mc-panel bg-[#2d2d2d] border border-[#424242] rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="p-4">
              {/* User Info */}
              <motion.div 
                className="flex flex-col gap-1 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-sm font-bold text-white truncate">
                  {user.user_metadata.username || "User"}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.email}
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div 
                className="border-t border-[#424242] my-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Sign Out Button */}
              <motion.button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 text-sm text-white hover:bg-[#3e8e2f] p-2 rounded transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}