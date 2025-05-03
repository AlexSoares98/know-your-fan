"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  CalendarClock, 
  ShoppingBag, 
  Trophy, 
  PlayCircle, 
  ThumbsUp, 
  Share, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

type RecommendationType = "match" | "product" | "content" | "quiz";

interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  image: string;
  primaryAction: {
    label: string;
    url: string;
  };
  secondaryAction?: {
    label: string;
    url: string;
  };
  metadata?: {
    [key: string]: string;
  };
}

export default function RecommendationsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      type: "match",
      title: "FURIA vs MIBR",
      description: "Hoje às 15:00 - ESL Pro League",
      image: "/icons/furia-logo.png",
      primaryAction: {
        label: "Assistir ao vivo",
        url: "https://www.twitch.tv/gaules"
      },
      secondaryAction: {
        label: "Ver detalhes",
        url: "https://www.hltv.org/team/8297/furia"
      },
      metadata: {
        date: "12/05/2025",
        time: "15:00",
        tournament: "ESL Pro League"
      }
    },
    {
      id: "2",
      type: "product",
      title: "Camisa Oficial FURIA 2025",
      description: "Lançamento exclusivo - Edição limitada",
      image: "/icons/furia-logo.png",
      primaryAction: {
        label: "Comprar agora",
        url: "https://furia.gg"
      },
      metadata: {
        price: "R$ 299,90",
        discount: "10% OFF"
      }
    },
    {
      id: "3",
      type: "content",
      title: "Estratégias da FURIA",
      description: "Análise tática das últimas partidas",
      image: "/icons/furia-logo.png",
      primaryAction: {
        label: "Assistir vídeo",
        url: "https://www.youtube.com/@FURIAgg"
      },
      metadata: {
        duration: "12:45",
        views: "32.456"
      }
    },
    {
      id: "4",
      type: "quiz",
      title: "Quanto você sabe sobre a FURIA?",
      description: "Teste seus conhecimentos e ganhe pontos",
      image: "/icons/furia-logo.png",
      primaryAction: {
        label: "Iniciar quiz",
        url: "#"
      },
      metadata: {
        questions: "10 perguntas",
        time: "5 minutos"
      }
    }
  ]);

  useEffect(() => {
  }, []);

  const nextCard = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1
    );
  };

  // Retorna o ícone apropriado para o tipo de recomendação
  const getTypeIcon = (type: RecommendationType) => {
    switch (type) {
      case "match":
        return <Trophy className="h-6 w-6 text-furia-gold" />;
      case "product":
        return <ShoppingBag className="h-6 w-6 text-furia-gold" />;
      case "content":
        return <PlayCircle className="h-6 w-6 text-furia-gold" />;
      case "quiz":
        return <CalendarClock className="h-6 w-6 text-furia-gold" />;
      default:
        return <ThumbsUp className="h-6 w-6 text-furia-gold" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Recomendações
      </motion.h1>
      
      <p className="text-gray-400">
        Recomendações personalizadas baseadas nas suas preferências e interações.
      </p>
      
      {/* Cards de Recomendação */}
      <div className="relative mt-8">
        <div className="flex justify-center">
          <motion.div 
            className="relative w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                className={`bg-furia-gray rounded-xl overflow-hidden shadow-xl ${index === activeIndex ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 bg-gray-800 relative">
                  <Image
                    src={recommendation.image}
                    alt={recommendation.title}
                    fill
                    className="object-contain p-6"
                  />
                  <div className="absolute top-4 right-4 bg-furia-dark rounded-full p-2">
                    {getTypeIcon(recommendation.type)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-orbitron text-white mb-2">
                    {recommendation.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {recommendation.description}
                  </p>
                  
                  {recommendation.metadata && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {Object.entries(recommendation.metadata).map(([key, value]) => (
                        <div key={key} className="bg-gray-800 px-3 py-2 rounded-md">
                          <p className="text-gray-400 text-xs mb-1 capitalize">{key}</p>
                          <p className="text-white font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Link 
                      href={recommendation.primaryAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-furia-gold hover:bg-furia-gold/90 text-black py-3 px-4 rounded-lg font-medium text-center transition-colors flex items-center justify-center"
                    >
                      {recommendation.primaryAction.label}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                    
                    {recommendation.secondaryAction && (
                      <a
                        href={recommendation.secondaryAction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors"
                      >
                        {recommendation.secondaryAction.label}
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Recomendação {activeIndex + 1} de {recommendations.length}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Curtir recomendação"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Compartilhar recomendação"
                    >
                      <Share className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Navegação */}
        <div className="absolute inset-y-0 left-0 flex items-center -ml-6">
          <button
            className="bg-furia-gold hover:bg-furia-gold/80 text-black rounded-full p-3 focus:outline-none transition-colors shadow-lg"
            onClick={prevCard}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center -mr-6">
          <button
            className="bg-furia-gold hover:bg-furia-gold/80 text-black rounded-full p-3 focus:outline-none transition-colors shadow-lg"
            onClick={nextCard}
            disabled={activeIndex === recommendations.length - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center mt-6">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-colors ${
                index === activeIndex ? 'bg-furia-gold' : 'bg-gray-600'
              }`}
              aria-label={`Ir para recomendação ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Conteúdo Adicional */}
      <motion.div
        className="mt-12 bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-orbitron mb-4 text-white">
          Outras Recomendações
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://furia.gg" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <ShoppingBag className="h-6 w-6 text-furia-gold mr-3" />
            <div>
              <h3 className="text-white font-medium">Loja FURIA</h3>
              <p className="text-gray-400 text-sm">15% de desconto</p>
            </div>
          </a>
          
          <a 
            href="https://www.instagram.com/furiagg/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <PlayCircle className="h-6 w-6 text-furia-gold mr-3" />
            <div>
              <h3 className="text-white font-medium">Instagram</h3>
              <p className="text-gray-400 text-sm">Conteúdo exclusivo</p>
            </div>
          </a>
          
          <a 
            href="https://twitter.com/FURIA" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <Trophy className="h-6 w-6 text-furia-gold mr-3" />
            <div>
              <h3 className="text-white font-medium">Twitter</h3>
              <p className="text-gray-400 text-sm">Atualizações em tempo real</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
} 