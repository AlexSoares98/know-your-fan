"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

type User = {
  name: string;
  email: string;
  image?: string;
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "Fã FURIA",
    email: "jogador@furia.gg",
    image: undefined,
  });

  useEffect(() => {
    const checkAuth = () => {
      const hasSession = localStorage.getItem("furia-fan-session");
      const onboardingComplete = localStorage.getItem("furia-fan-onboarding-complete");
      
      if (!hasSession) {
        router.push("/auth/login");
      } else if (hasSession && onboardingComplete !== "true") {
        router.push("/auth/onboarding");
      } else {
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-furia-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-furia-gold mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout user={user}>
      <div className="relative z-10 pt-4 pb-8">
        {children}
      </div>
    </DashboardLayout>
  );
} 