"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "Fã FURIA",
    email: "jogador@furia.gg",
    image: undefined,
  });

  useEffect(() => {
    // Verificação de autenticação simulada
    const checkAuth = () => {
      const hasSession = localStorage.getItem("furia-fan-session");
      const onboardingComplete = localStorage.getItem("furia-fan-onboarding-complete");
      
      if (!hasSession) {
        // Não está autenticado, redireciona para login
        router.push("/auth/login");
      } else if (hasSession && onboardingComplete !== "true") {
        // Autenticado mas onboarding não concluído
        router.push("/auth/onboarding");
      } else {
        // Autenticado e onboarding concluído
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    // Tela de carregamento
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
    return null; // Será redirecionado pelo useEffect
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
} 