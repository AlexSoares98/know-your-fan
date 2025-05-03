"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import UserDataForm, { UserFormData } from "@/components/UserDataForm";
import DocumentUpload from "@/components/DocumentUpload";
import SocialMediaConnect from "@/components/SocialMediaConnect";
import ESportsProfileLinks from "@/components/ESportsProfileLinks";

type RegistrationStep = "userdata" | "documents" | "social" | "esports" | "completed";

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("userdata");
  const [progress, setProgress] = useState(25);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [isDocumentValidated, setIsDocumentValidated] = useState(false);
  const [isSocialConnected, setIsSocialConnected] = useState(false);
  const [isProfileValidated, setIsProfileValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUserDataSubmit = (data: UserFormData) => {
    setUserData(data);
    setCurrentStep("documents");
    setProgress(50);
  };

  const handleDocumentComplete = (validated: boolean) => {
    setIsDocumentValidated(validated);
    setCurrentStep("social");
    setProgress(75);
  };

  const handleSocialComplete = (connected: boolean) => {
    setIsSocialConnected(connected);
    setCurrentStep("esports");
    setProgress(90);
  };

  const handleProfileComplete = (validated: boolean) => {
    setIsProfileValidated(validated);
    setCurrentStep("completed");
    setProgress(100);
    
    // Simula finalização do registro
    setLoading(true);
    setTimeout(() => {
      // Em uma implementação real, enviaria todos os dados para a API
      localStorage.setItem("furia-fan-session", "true");
      localStorage.setItem("furia-fan-onboarding-complete", "true");
      
      // Define o cadastro como completo e marca para mostrar a animação de pontos
      localStorage.setItem("furia-profile-complete", "true");
      localStorage.setItem("furia-just-completed-profile", "true");
      
      // Adiciona pontos aos hashstags para simular o aumento de nível
      const preferences = JSON.parse(localStorage.getItem("furia-fan-preferences") || "{}");
      preferences.postsWithHashtags = (preferences.postsWithHashtags || 0) + 3;
      localStorage.setItem("furia-fan-preferences", JSON.stringify(preferences));
      
      // Redireciona para o dashboard
      router.push("/dashboard/overview");
    }, 3000);
  };

  const getStepBack = () => {
    switch (currentStep) {
      case "documents":
        return () => setCurrentStep("userdata");
      case "social":
        return () => setCurrentStep("documents");
      case "esports":
        return () => setCurrentStep("social");
      default:
        return () => {};
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-furia-dark">
      {/* Header com progresso */}
      <header className="bg-furia-gray shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/icons/furia-logo.png"
              alt="FURIA Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-orbitron text-white ml-3">
              <span className="text-furia-gold">FURIA</span> Fan Hub
            </h1>
          </div>
          
          <div className="w-40 md:w-64 bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-furia-purple to-furia-gold h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === "userdata" && (
            <UserDataForm
              key="userdata"
              onSubmit={handleUserDataSubmit}
              onCancel={() => router.push("/")}
            />
          )}

          {currentStep === "documents" && (
            <DocumentUpload
              key="documents"
              onComplete={handleDocumentComplete}
              onBack={getStepBack()}
            />
          )}

          {currentStep === "social" && (
            <SocialMediaConnect
              key="social"
              onComplete={handleSocialComplete}
              onBack={getStepBack()}
            />
          )}

          {currentStep === "esports" && (
            <ESportsProfileLinks
              key="esports"
              onComplete={handleProfileComplete}
              onBack={getStepBack()}
            />
          )}

          {currentStep === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-furia-gray rounded-xl shadow-xl p-6 md:p-8 w-full max-w-4xl mx-auto text-center"
            >
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-furia-purple to-furia-gold rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-furia-gray flex items-center justify-center">
                    <Image
                      src="/icons/furia-logo.png"
                      alt="FURIA Logo"
                      width={40}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-orbitron text-white mb-4">
                Cadastro Concluído!
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                Parabéns! Você agora faz parte da comunidade FURIA Fan Hub. Estamos preparando
                seu dashboard personalizado com base no seu perfil e interesses.
              </p>
              
              {loading && (
                <div className="flex flex-col items-center justify-center mt-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-furia-gold"></div>
                  <p className="text-gray-400 mt-4">Redirecionando para o dashboard...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 