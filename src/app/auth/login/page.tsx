"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function LoginPage() {
  // O estado isLoading é mantido para controlar a exibição do spinner de carregamento na interface
  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-furia-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Image
            src="/icons/furia-logo.png"
            alt="FURIA Logo"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
        </div>
        
        <div className="bg-furia-gray rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-orbitron text-white text-center mb-6">
            Acesse o <span className="text-furia-gold">FURIA Fan Hub</span>
          </h1>
          
          <p className="text-gray-400 text-center mb-8">
            Entre com sua rede social favorita em poucos cliques
          </p>
          
          <SocialLoginButtons />
          
          {isLoading && (
            <div className="flex justify-center mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-furia-gold"></div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Ao continuar, você aceita os{" "}
              <Link href="#" className="text-furia-purple hover:underline">
                Termos de uso
              </Link>{" "}
              e a{" "}
              <Link href="#" className="text-furia-purple hover:underline">
                Política de privacidade
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 