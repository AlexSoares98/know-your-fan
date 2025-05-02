"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();

  const handleSignOut = () => {
    // In a real app, this would call an auth signOut method
    router.push("/auth/login");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onSignOut={handleSignOut} />
      
      <div className="flex-1 flex flex-col ml-64">
        <Navbar 
          username={user.name} 
          avatar={user.image} 
          unreadNotifications={2} 
        />
        
        <main className="flex-1 overflow-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
} 