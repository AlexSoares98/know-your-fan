"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const hasSession = localStorage.getItem("furia-fan-session");
      
      if (hasSession) {
        router.push("/dashboard/overview");
      }
    };
    
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Imagem de fundo específica para a home */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/bg-furia.webp"
          alt="FURIA Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-furia-dark/80 "></div>
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="flex-1 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 container mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-orbitron text-white mb-6">
                <span className="text-furia-gold">FURIA</span> Fan Hub
              </h1>
              
              <p className="text-lg text-gray-300 mb-8">
                Entenda, segmente e engaje com a FURIA. Uma plataforma exclusiva que conecta você com sua paixão por E-Sports de uma forma totalmente nova.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-furia-dark hover:bg-furia-dark/80 text-white font-medium transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10">Conectar com a FURIA</span>
                  <svg className="ml-2 w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-furia-gold via-furia-purple to-furia-gold bg-[length:400%_100%] animate-gradient-x"></span>
                  <span className="absolute inset-[2px] rounded-[6px] bg-furia-dark z-0"></span>
                  <div className="absolute inset-0 -top-10 bg-gradient-to-t from-furia-gold/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 z-0"></div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="md:w-1/2 relative h-64 md:h-96 w-full"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="py-6 border-t border-furia-gray/30 text-center text-sm text-gray-400 relative z-10">
          <p>© {new Date().getFullYear()} FURIA Fan Hub - Todos os direitos reservados</p>
          <p className="mt-1">
            <Link href="https://furia.gg" className="text-furia-gold hover:underline" target="_blank" rel="noopener noreferrer">
              Visitar loja oficial
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
