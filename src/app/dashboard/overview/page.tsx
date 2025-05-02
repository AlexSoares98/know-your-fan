"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Users, ExternalLink } from "lucide-react";
import { FanLevelBadge } from "@/components/FanLevelBadge";

type MatchInfo = {
  id: string;
  opponent: string;
  tournament: string;
  date: string;
  time: string;
  isLive: boolean;
  game: string;
  opponentLogo: string;
};

export default function DashboardOverviewPage() {
  const [userData, setUserData] = useState({
    name: "Fã FURIA",
    postsWithHashtags: 8,
    postsWithLikes: 4,
    quizParticipation: true,
    purchases: 0,
    favoritePlayer: "FalleN",
    socialPlatform: "",
    device: "",
    age: "",
    connectedSocials: 0
  });
  
  const [nextMatches, setNextMatches] = useState<MatchInfo[]>([
    {
      id: "1",
      opponent: "MIBR",
      tournament: "ESL Pro League",
      date: "12/05/2025",
      time: "15:00",
      isLive: false,
      game: "CS:GO",
      opponentLogo: "/logo-mibr.png",
    },
    {
      id: "2",
      opponent: "Liquid",
      tournament: "BLAST Premier",
      date: "15/05/2025",
      time: "18:30",
      isLive: false,
      game: "CS:GO",
      opponentLogo: "/logo-liquid.png",
    },
  ]);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("furia-fan-preferences");
    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      
      // Mapear ID do jogador para nome
      const playerName = 
        preferences.favoritePlayer === "1" ? "FalleN" :
        preferences.favoritePlayer === "2" ? "yuurih" :
        preferences.favoritePlayer === "3" ? "KSCERATO" :
        preferences.favoritePlayer === "4" ? "YEKINDAR" :
        preferences.favoritePlayer === "5" ? "molodoy" : "Jogador FURIA";
      
      // Mapear plataforma social e dispositivo
      const socialPlatformMap: Record<string, string> = {
        "youtube": "YouTube",
        "instagram": "Instagram",
        "x": "X (Twitter)",
        "discord": "Discord"
      };
      
      const deviceMap: Record<string, string> = {
        "desktop": "Desktop",
        "mobile": "Mobile",
        "tablet": "Tablet"
      };
      
      const ageRangeMap: Record<string, string> = {
        "abaixo18": "Menos de 18 anos",
        "18a24": "18 a 24 anos",
        "25a34": "25 a 34 anos",
        "35a44": "35 a 44 anos",
        "acima45": "Acima de 45 anos"
      };
      
      setUserData(prev => ({
        ...prev,
        favoritePlayer: playerName,
        socialPlatform: socialPlatformMap[preferences.socialPlatform] || "",
        device: deviceMap[preferences.device] || "",
        age: ageRangeMap[preferences.age] || "",
        connectedSocials: preferences.connectedSocials || 0
      }));
    }
    
    // Verificar conexões sociais
    const socialConnections = localStorage.getItem("furia-social-connections");
    if (socialConnections) {
      const connections = JSON.parse(socialConnections);
      const connectedCount = connections.filter((conn: any) => conn.connected).length;
      
      setUserData(prev => ({
        ...prev,
        connectedSocials: connectedCount
      }));
    }
  }, []);

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Visão Geral
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Perfil do Fã */}
        <motion.div 
          className="bg-furia-gray p-6 rounded-xl"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-orbitron mb-4 text-white">Seu Perfil</h2>
          
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-furia-purple mb-4">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=884AE5&color=fff&size=100`}
                alt="Avatar do usuário"
                fill
                className="object-cover"
              />
            </div>
            
            <h3 className="text-lg font-medium text-white mb-2">{userData.name}</h3>
            
            <FanLevelBadge
              postsWithHashtags={userData.postsWithHashtags}
              postsWithLikes={userData.postsWithLikes}
              quizParticipation={userData.quizParticipation}
              purchases={userData.purchases}
              connectedSocials={userData.connectedSocials}
              className="mt-4"
            />
            
            <div className="mt-6 w-full pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Jogador favorito:</span>
                <span className="text-sm font-medium text-white">{userData.favoritePlayer}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Posts com hashtags:</span>
                <span className="text-sm font-medium text-white">{userData.postsWithHashtags}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Posts com 50+ curtidas:</span>
                <span className="text-sm font-medium text-white">{userData.postsWithLikes}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Participação em quizes:</span>
                <span className="text-sm font-medium text-white">{userData.quizParticipation ? "Sim" : "Não"}</span>
              </div>
              
              {userData.socialPlatform && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Plataforma preferida:</span>
                  <span className="text-sm font-medium text-white">{userData.socialPlatform}</span>
                </div>
              )}
              
              {userData.device && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Dispositivo usado:</span>
                  <span className="text-sm font-medium text-white">{userData.device}</span>
                </div>
              )}
              
              {userData.age && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Idade:</span>
                  <span className="text-sm font-medium text-white">{userData.age}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Redes sociais conectadas:</span>
                <span className="text-sm font-medium text-white">{userData.connectedSocials}</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Próximas Partidas */}
        <motion.div 
          className="bg-furia-gray p-6 rounded-xl md:col-span-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-orbitron mb-4 text-white">Próximas Partidas</h2>
          
          <div className="space-y-4">
            {nextMatches.map((match) => (
              <div 
                key={match.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 mr-4">
                      <Image
                        src="/icons/furia-logo.png"
                        alt="FURIA Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg font-medium text-white">FURIA</span>
                    <span className="mx-3 text-gray-400">vs</span>
                    <span className="text-lg font-medium text-white">{match.opponent}</span>
                    <div className="relative h-10 w-10 ml-4">
                      <Image
                        src={match.opponentLogo}
                        alt={`${match.opponent} Logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {match.isLive && (
                    <span className="flex items-center px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      <span className="animate-pulse w-2 h-2 rounded-full bg-white mr-2"></span>
                      AO VIVO
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Trophy className="h-4 w-4 mr-1" />
                    {match.tournament}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {match.date}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {match.time}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {match.game}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <a 
                    href="#" 
                    className="flex items-center text-furia-purple hover:text-furia-purple/80 text-sm font-medium"
                  >
                    Detalhes da partida
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center pt-4">
              <a
                href="https://www.hltv.org/team/8297/furia"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-furia-purple hover:bg-furia-purple/90 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                Ver calendário completo
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 