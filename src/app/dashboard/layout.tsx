"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useSession } from "next-auth/react";

type UserProfile = {
  name: string;
  email: string;
  image?: string | null;
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: "Fã FURIA",
    email: "jogador@furia.gg",
    image: undefined,
  });

  useEffect(() => {
    // Verificação de autenticação combinada (NextAuth + local storage)
    const checkAuth = () => {
      const hasSession = localStorage.getItem("furia-fan-session");
      const onboardingComplete = localStorage.getItem("furia-fan-onboarding-complete");
      
      // Se temos sessão do NextAuth ou sessão local
      if (status === "authenticated" || hasSession) {
        if (onboardingComplete !== "true") {
          // Autenticado mas onboarding não concluído
          router.push("/auth/onboarding");
        } else {
          // Autenticado e onboarding concluído
          // Se temos dados do NextAuth, usamos eles para o perfil
          if (session?.user) {
            setUser({
              name: session.user.name || "Fã FURIA",
              email: session.user.email || "jogador@furia.gg",
              image: session.user.image || undefined,
            });
            
            // Garantir que temos a sessão no localStorage também
            localStorage.setItem("furia-fan-session", "true");
          }
          
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      } else if (status === "unauthenticated" && !hasSession) {
        // Não está autenticado por nenhuma forma, redireciona para login
        router.push("/auth/login");
      }
    };
    
    // Só verificamos quando o status do NextAuth é confirmado
    if (status !== "loading") {
      checkAuth();
    }
  }, [router, session, status]);

  if (isLoading || status === "loading") {
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