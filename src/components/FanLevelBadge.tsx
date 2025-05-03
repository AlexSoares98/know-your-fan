"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export type FanLevel = "casual" | "leal" | "furioso";

interface FanLevelBadgeProps {
  postsWithHashtags?: number;
  postsWithLikes?: number;
  quizParticipation?: boolean;
  purchases?: number;
  connectedSocials?: number;
  showProgress?: boolean;
  showAnimation?: boolean;
  className?: string;
}

export function FanLevelBadge({
  postsWithHashtags = 0,
  postsWithLikes = 0,
  quizParticipation = false,
  purchases = 0,
  connectedSocials = 0,
  showProgress = true,
  showAnimation = false,
  className = "",
}: FanLevelBadgeProps) {
  const [fanLevel, setFanLevel] = useState<FanLevel>("casual");
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [canBoost, setCanBoost] = useState(false);

  useEffect(() => {
    // Determinar o nível do fã baseado nas regras
    let level: FanLevel = "casual";
    let currentProgress = 0;
    
    // Bônus por redes sociais conectadas
    const socialBonus = connectedSocials * 2; // Cada rede social vale 2 pontos
    
    if ((postsWithLikes >= 10 && purchases > 0) || (postsWithLikes >= 8 && connectedSocials >= 2)) {
      // Nível Furioso: 10+ posts com likes e pelo menos uma compra
      // OU 8+ posts com likes e 2 redes sociais conectadas
      level = "furioso";
      currentProgress = 100;
    } else if ((postsWithHashtags >= 5 && quizParticipation) || (postsWithHashtags >= 3 && connectedSocials >= 1)) {
      // Nível Leal: 5+ posts com hashtags e participação em quizes
      // OU 3+ posts com hashtags e pelo menos 1 rede social conectada
      level = "leal";
      
      // Calcular progresso para o próximo nível (Furioso)
      if (postsWithLikes > 0) {
        const likesProgress = Math.min(postsWithLikes / 10, 1) * 60; // 60% do progresso
        const purchaseProgress = purchases > 0 ? 20 : 0; // 20% do progresso
        const socialProgress = Math.min(connectedSocials / 2, 1) * 20; // 20% do progresso por redes sociais
        currentProgress = likesProgress + purchaseProgress + socialProgress;
      } else {
        // Se ainda não tem posts com likes suficientes
        currentProgress = 10 + socialBonus; // Progresso inicial por ser Leal + bônus social
      }
    } else {
      // Calcular progresso para o próximo nível (Leal)
      const hashtagProgress = Math.min(postsWithHashtags / 5, 1) * 60; // 60% do progresso
      const quizProgress = quizParticipation ? 20 : 0; // 20% do progresso
      const socialProgress = Math.min(connectedSocials / 2, 1) * 20; // 20% do progresso por redes sociais
      currentProgress = hashtagProgress + quizProgress + socialProgress;
    }
    
    setFanLevel(level);
    setProgress(currentProgress);
    
    // Se não estiver animando, atualiza o progresso animado imediatamente
    if (!showAnimation) {
      setAnimatedProgress(currentProgress);
    }
  }, [postsWithHashtags, postsWithLikes, quizParticipation, purchases, connectedSocials, showAnimation]);

  // Efeito para animar o progresso quando showAnimation for true
  useEffect(() => {
    if (showAnimation) {
      // Começa com o valor atual menos 10 pontos (simula o aumento)
      setAnimatedProgress(Math.max(0, progress - 10));
      setCanBoost(true);
      
      // Anima para o valor atual completo
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [showAnimation, progress]);

  // Função para aumentar o preenchimento em 10% quando a seta é clicada
  const handleBoostProgress = () => {
    if (canBoost && progress < 100) {
      const newProgress = Math.min(100, progress + 10);
      setProgress(newProgress);
      setAnimatedProgress(newProgress);
      setCanBoost(false); // Desabilita o boost após ser usado
      
      // Atualiza os dados no localStorage
      const preferences = JSON.parse(localStorage.getItem("furia-fan-preferences") || "{}");
      preferences.postsWithHashtags = (preferences.postsWithHashtags || 0) + 1;
      localStorage.setItem("furia-fan-preferences", JSON.stringify(preferences));
    }
  };

  // Dados dos níveis
  const levelData = {
    casual: {
      label: "Casual",
      icon: "/icons/fa-casual.svg",
      color: "text-gray-400",
      description: "Você está começando a interagir com a FURIA. Continue engajando!"
    },
    leal: {
      label: "Leal",
      icon: "/icons/fa-leal.svg",
      color: "text-furia-purple",
      description: "Você é um fã dedicado da FURIA. Continue participando!"
    },
    furioso: {
      label: "Furioso",
      icon: "/icons/fa-furioso.svg",
      color: "text-furia-gold",
      description: "Você é um dos fãs mais dedicados da FURIA. Parabéns!"
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 relative">
          <Image
            src={levelData[fanLevel].icon}
            alt={`Nível ${levelData[fanLevel].label}`}
            fill
            className="object-contain"
          />
        </div>
        
        <button 
          className="absolute -top-1 -right-1 bg-furia-gray rounded-full p-1 hover:bg-gray-700 transition-colors"
          onClick={() => setTooltipVisible(!tooltipVisible)}
          aria-label="Informações sobre nível de fã"
        >
          <Info size={16} className="text-gray-300" />
        </button>
        
        {tooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 top-full mt-2 right-0 w-72 p-3 bg-furia-gray border border-gray-700 rounded-lg shadow-lg"
          >
            <h4 className="font-medium text-white mb-1">
              {levelData[fanLevel].label}
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              {levelData[fanLevel].description}
            </p>
            <div className="text-xs text-gray-400">
              <p>• Casual: Criar conta e completar o processo de onboarding</p>
              <p>• Leal: ≥5 posts com hashtags + participação em quizes <strong>OU</strong> ≥3 posts com hashtags + 1 rede social conectada</p>
              <p>• Furioso: ≥10 posts com 50+ curtidas + compras <strong>OU</strong> ≥8 posts com likes + 2 redes sociais conectadas</p>
              <p className="mt-1 text-furia-purple">Cada rede social conectada adiciona bônus para seu progresso!</p>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="mt-2 text-center">
        <h3 className={`font-orbitron font-bold ${levelData[fanLevel].color}`}>
          {levelData[fanLevel].label}
        </h3>
        
        {showProgress && fanLevel !== "furioso" && (
          <div className="w-full mt-2">
            <div className="flex items-center justify-center">
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${fanLevel === "leal" ? "bg-furia-purple" : "bg-gray-500"}`}
                  style={{ width: `${animatedProgress}%` }}
                  animate={showAnimation ? 
                    { width: `${progress}%`, transition: { duration: 1.5, ease: "easeOut" } } : 
                    { width: `${animatedProgress}%` }
                  }
                ></motion.div>
              </div>
              
              {canBoost && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleBoostProgress}
                  className="text-furia-gold hover:text-furia-purple transition-colors ml-2"
                  title="Clique para aumentar seu progresso"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </motion.button>
              )}
            </div>
            
            <div className="mt-1">
              <p className="text-xs text-gray-400">
                {progress.toFixed(0)}/100 pontos
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 