"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Em uma implementação real isso usaria NextAuth.js
    // Para o protótipo, apenas simularemos o login
    setTimeout(() => {
      // Simular autenticação bem-sucedida
      localStorage.setItem("furia-fan-session", "true");
      localStorage.setItem("furia-fan-onboarding-complete", "false");
      
      // Redirecionar para o onboarding
      router.push("/auth/onboarding");
    }, 1000);
  };

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
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-black text-white font-medium transition-colors hover:bg-zinc-800"
              onClick={() => handleSocialLogin("twitter")}
              disabled={isLoading}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Continuar com X</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-[#5865F2] text-white font-medium transition-colors hover:bg-[#4a56e3]"
              onClick={() => handleSocialLogin("discord")}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
              </svg>
              <span>Continuar com Discord</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-[#4285F4] text-white font-medium transition-colors hover:bg-[#3b78e7]"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Mail size={20} />
              <span>Continuar com Google</span>
            </motion.button>
          </div>
          
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