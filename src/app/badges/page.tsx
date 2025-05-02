"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Badge = {
  id: string;
  name: string;
  image: string;
  description: string;
  howToGet: string;
  level: "Casual" | "Leal" | "Furioso";
};

export default function BadgesPage() {
  const badges: Badge[] = [
    {
      id: "casual",
      name: "Fã Casual",
      image: "/icons/fa-casual.svg",
      description: "Você está começando sua jornada como fã da FURIA. Este badge demonstra seu interesse inicial pela equipe.",
      howToGet: "Recebido automaticamente ao criar sua conta e completar o processo de onboarding.",
      level: "Casual"
    },
    {
      id: "leal",
      name: "Fã Leal",
      image: "/icons/fa-leal.svg",
      description: "Você já demonstra engajamento consistente com a FURIA. Este badge reconhece sua dedicação.",
      howToGet: "Interaja regularmente com publicações e participe dos quizes semanais. Faça pelo menos 5 publicações usando hashtags da FURIA (#FURIA, #FURIAGG, #FURIAxCS2).",
      level: "Leal"
    },
    {
      id: "furioso",
      name: "Fã Furioso",
      image: "/icons/fa-furioso.svg",
      description: "Você é um dos fãs mais dedicados da FURIA! Este badge é para verdadeiros aficionados.",
      howToGet: "Acompanhe pelo menos 10 partidas, participe dos quizes com pontuação acima de 80%, compartilhe conteúdo da FURIA em suas redes sociais, compre produtos oficiais e tenha 10 ou mais publicações com pelo menos 50 curtidas cada.",
      level: "Furioso"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Badges <span className="text-furia-gold">FURIA</span>
      </motion.h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        Os badges representam seu nível de engajamento com a FURIA. Quanto mais você interage, assiste partidas e participa das atividades, mais você progride na sua jornada como fã!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <motion.div 
            key={badge.id}
            className="bg-furia-gray rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="relative w-40 h-40 mb-6">
                <Image 
                  src={badge.image}
                  alt={badge.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h2 className="text-2xl font-orbitron text-furia-gold mb-2 text-center">{badge.name}</h2>
              
              <div className="bg-furia-dark px-3 py-1 rounded-full text-sm font-medium text-white mb-4">
                Nível: {badge.level}
              </div>
              
              <p className="text-gray-300 mb-4 text-center">
                {badge.description}
              </p>
              
              <div className="bg-gray-800 rounded-lg p-4 w-full">
                <h3 className="text-furia-purple font-medium mb-2">Como conseguir:</h3>
                <p className="text-gray-300 text-sm">
                  {badge.howToGet}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 bg-furia-dark rounded-xl p-6 border border-furia-purple/20">
        <h2 className="text-2xl font-orbitron text-white mb-4">Progresso de Badges</h2>
        <p className="text-gray-300 mb-6">
          O sistema de badges é progressivo. Você começa como Fã Casual e, conforme aumenta seu engajamento, pode evoluir para Fã Leal e, finalmente, Fã Furioso. O nível de badge influencia diretamente nas vantagens e conteúdos exclusivos que você recebe.
        </p>
        
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-xl font-orbitron text-furia-gold mb-4">Dicas para evoluir:</h3>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
              Participe dos quizes semanais e tente obter a pontuação máxima
            </li>
            <li className="flex items-start">
              <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
              Assista às partidas da FURIA e interaja durante as transmissões
            </li>
            <li className="flex items-start">
              <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
              Compartilhe conteúdo da FURIA nas suas redes sociais favoritas
            </li>
            <li className="flex items-start">
              <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
              Adquira produtos oficiais na loja da FURIA para mostrar seu apoio
            </li>
            <li className="flex items-start">
              <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">5</span>
              Interaja com outros fãs em comunidades oficiais e eventos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 