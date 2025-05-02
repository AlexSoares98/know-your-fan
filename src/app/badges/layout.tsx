"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

export default function BadgesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [username] = useState("Fã FURIA");
  
  const handleSignOut = () => {
    localStorage.removeItem("furia-fan-session");
    localStorage.removeItem("furia-fan-onboarding-complete");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-furia-dark">
      <Sidebar onSignOut={handleSignOut} />
      
      <div className="flex-1 ml-64">
        <Navbar username={username} unreadNotifications={2} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 