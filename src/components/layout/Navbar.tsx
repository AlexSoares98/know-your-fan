"use client";

import { useState, useEffect } from "react";
import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";

interface NavbarProps {
  username: string;
  avatar?: string | null;
  unreadNotifications?: number;
}

export function Navbar({ username, avatar, unreadNotifications = 0 }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <nav className="h-16 bg-background border-b border-border px-4 flex items-center justify-between">
      <div>
        {/* Mobile view only - placeholder for hamburger menu */}
        <div className="md:hidden">
          {/* Hamburger icon would go here */}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-md hover:bg-furia-gray transition-colors"
          aria-label="Alternar tema"
        >
          {mounted && (
            theme === "dark" ? (
              <Sun className="h-5 w-5 text-furia-gold" />
            ) : (
              <Moon className="h-5 w-5 text-furia-purple" />
            )
          )}
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-furia-gray transition-colors">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-furia-orange rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium hidden md:block">
            {username}
          </div>
          <Avatar name={username} size="sm" />
        </div>
      </div>
    </nav>
  );
} 