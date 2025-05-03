"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, X, Instagram, Twitter, PlusCircle, Link as LinkIcon } from "lucide-react";

type SocialConnection = {
  platform: "x" | "instagram";
  connected: boolean;
  username?: string;
};

export default function ConnectionsPage() {
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: "x", connected: false },
    { platform: "instagram", connected: false }
  ]);
  
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  
  useEffect(() => {
    const savedConnections = localStorage.getItem("furia-social-connections");
    if (savedConnections) {
      setSocialConnections(JSON.parse(savedConnections));
    }
  }, []);
  
  const connectSocial = (platform: "x" | "instagram") => {
    setIsConnecting(platform);
    
    setTimeout(() => {
      const updatedConnections = socialConnections.map(conn => {
        if (conn.platform === platform) {
          const username = platform === "x" ? "furia_fan" : "furia.fan";
          return { ...conn, connected: true, username };
        }
        return conn;
      });
      
      setSocialConnections(updatedConnections);
      localStorage.setItem("furia-social-connections", JSON.stringify(updatedConnections));
      
      const storedPreferences = localStorage.getItem("furia-fan-preferences");
      if (storedPreferences) {
        const preferences = JSON.parse(storedPreferences);
        preferences.connectedSocials = updatedConnections.filter(c => c.connected).length;
        localStorage.setItem("furia-fan-preferences", JSON.stringify(preferences));
      }
      
      setIsConnecting(null);
    }, 2000); 
  };
  
  const disconnectSocial = (platform: "x" | "instagram") => {
    const updatedConnections = socialConnections.map(conn => {
      if (conn.platform === platform) {
        return { ...conn, connected: false, username: undefined };
      }
      return conn;
    });
    
    setSocialConnections(updatedConnections);
    localStorage.setItem("furia-social-connections", JSON.stringify(updatedConnections));

    const storedPreferences = localStorage.getItem("furia-fan-preferences");
    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      preferences.connectedSocials = updatedConnections.filter(c => c.connected).length;
      localStorage.setItem("furia-fan-preferences", JSON.stringify(preferences));
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
        Conexões Sociais
      </motion.h1>
      
      <motion.div 
        className="bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="mb-4">
          <h2 className="text-xl font-orbitron mb-2 text-white">Conecte suas redes sociais</h2>
          <p className="text-gray-400">
            Conectar suas contas de redes sociais permite personalizar melhor sua experiência 
            e desbloquear badges exclusivos. Para cada rede social conectada, você ganha pontos 
            para seu nível de fã.
          </p>
        </div>
        
        <div className="space-y-4 mt-6">
          {socialConnections.map((connection) => (
            <div 
              key={connection.platform}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center">
                {connection.platform === "x" ? (
                  <Twitter className="w-6 h-6 mr-3 text-gray-300" />
                ) : (
                  <Instagram className="w-6 h-6 mr-3 text-gray-300" />
                )}
                
                <div>
                  <h3 className="text-white font-medium">
                    {connection.platform === "x" ? "X (Twitter)" : "Instagram"}
                  </h3>
                  
                  {connection.connected && connection.username && (
                    <div className="flex items-center mt-1">
                      <span className="text-gray-400 text-sm">@{connection.username}</span>
                      <span className="ml-2 bg-green-900/50 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Conectado
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {connection.connected ? (
                <button
                  onClick={() => disconnectSocial(connection.platform)}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm flex items-center"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  Desconectar
                </button>
              ) : (
                <button
                  onClick={() => connectSocial(connection.platform)}
                  disabled={isConnecting === connection.platform}
                  className={`px-3 py-1.5 ${
                    isConnecting === connection.platform 
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                      : "bg-furia-gold hover:bg-furia-gold/90 text-black"
                  } rounded-lg text-sm flex items-center`}
                >
                  {isConnecting === connection.platform ? (
                    <>
                      <div className="w-4 h-4 mr-1.5 animate-spin rounded-full border-2 border-gray-400 border-t-white"></div>
                      Conectando...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-1.5" />
                      Conectar
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center text-gray-400">
            <PlusCircle className="w-5 h-5 mr-2 text-furia-gold" />
            <span>
              Cada rede social conectada adiciona pontos ao seu perfil e ajuda a desbloquear 
              níveis de fã mais altos.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}