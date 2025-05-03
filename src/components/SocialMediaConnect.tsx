import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Check, X, AlertCircle, Loader2 } from "lucide-react";

type SocialMediaConnectProps = {
  onComplete: (connected: boolean) => void;
  onBack: () => void;
};

type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  status: "idle" | "connecting" | "analyzing" | "connected" | "failed";
  username?: string;
};

export default function SocialMediaConnect({ onComplete, onBack }: SocialMediaConnectProps) {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: "🐦",
      color: "#1DA1F2",
      connected: false,
      status: "idle"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      color: "#E1306C",
      connected: false,
      status: "idle"
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "👍",
      color: "#4267B2",
      connected: false,
      status: "idle"
    },
    {
      id: "twitch",
      name: "Twitch",
      icon: "🎮",
      color: "#9146FF",
      connected: false,
      status: "idle"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎬",
      color: "#FF0000",
      connected: false,
      status: "idle"
    },
    {
      id: "discord",
      name: "Discord",
      icon: "💬",
      color: "#5865F2",
      connected: false,
      status: "idle"
    }
  ]);

  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "analyzing" | "complete" | "error">("idle");
  const [analysisData, setAnalysisData] = useState<{
    furiaInteractions: number;
    esportsPages: number;
    relevantContent: number;
    recommendedLevel: "casual" | "leal" | "furioso";
  } | null>(null);

  const connectSocialMedia = (platformId: string) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, status: "connecting" } 
          : platform
      )
    );

    // Simula o processo de conexão e análise
    setTimeout(() => {
      setPlatforms(prev => 
        prev.map(platform => 
          platform.id === platformId 
            ? { 
                ...platform, 
                status: "analyzing",
                username: generateRandomUsername(platform.id) 
              } 
            : platform
        )
      );

      // Simula a análise da conta
      setTimeout(() => {
        // 10% de chance de falha para demonstração
        const success = Math.random() > 0.1;
        
        setPlatforms(prev => 
          prev.map(platform => 
            platform.id === platformId 
              ? { 
                  ...platform, 
                  status: success ? "connected" : "failed",
                  connected: success
                } 
              : platform
          )
        );
      }, 3000);
    }, 2000);
  };

  const generateRandomUsername = (platform: string): string => {
    // Retorna um nome de simulação 
    return "fa_furia";
  };

  const analyzeConnections = () => {
    // Verifica se pelo menos uma rede social está conectada
    const hasConnections = platforms.some(platform => platform.connected);
    
    if (!hasConnections) {
      return;
    }

    setAnalysisStatus("analyzing");

    // Simula a análise
    setTimeout(() => {
      const furiaInteractions = Math.floor(Math.random() * 50) + 10;
      const esportsPages = Math.floor(Math.random() * 20) + 5;
      const relevantContent = Math.floor(Math.random() * 100) + 20;
      
      // Determina o nível com base nas interações
      let recommendedLevel: "casual" | "leal" | "furioso" = "casual";
      if (furiaInteractions > 30 && esportsPages > 15) {
        recommendedLevel = "furioso";
      } else if (furiaInteractions > 20 || esportsPages > 10) {
        recommendedLevel = "leal";
      }

      setAnalysisData({
        furiaInteractions,
        esportsPages,
        relevantContent,
        recommendedLevel
      });

      setAnalysisStatus("complete");
      
      // Notifica o componente principal 
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }, 4000);
  };

  const renderStatusBadge = (status: SocialPlatform["status"]) => {
    switch (status) {
      case "connecting":
        return (
          <div className="flex items-center bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
            <Loader2 size={10} className="mr-1 animate-spin" /> Conectando
          </div>
        );
      case "analyzing":
        return (
          <div className="flex items-center bg-furia-purple text-white px-2 py-1 rounded-full text-xs">
            <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-pulse"></span> Analisando
          </div>
        );
      case "connected":
        return (
          <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-full text-xs">
            <Check size={10} className="mr-1" /> Conectado
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full text-xs">
            <X size={10} className="mr-1" /> Falha
          </div>
        );
      default:
        return null;
    }
  };

  const getFanLevelColor = (level: "casual" | "leal" | "furioso") => {
    switch (level) {
      case "casual":
        return "text-blue-400";
      case "leal":
        return "text-furia-purple";
      case "furioso":
        return "text-furia-gold";
      default:
        return "text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-furia-gray rounded-xl shadow-xl p-6 md:p-8 w-full max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-orbitron text-white mb-2">
        Conecte suas Redes Sociais
      </h2>
      <p className="text-gray-400 mb-6">
        Vincule suas contas para analisarmos seu perfil de fã e personalizar sua experiência.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {platforms.map((platform) => (
          <div 
            key={platform.id}
            className="bg-furia-dark rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{platform.icon}</span>
                <span className="text-white font-medium">{platform.name}</span>
              </div>
              {renderStatusBadge(platform.status)}
            </div>
            
            {platform.status === "connected" && platform.username && (
              <div className="mb-3 px-3 py-1.5 bg-gray-800 rounded text-sm text-gray-300">
                @{platform.username}
              </div>
            )}
            
            {platform.status === "idle" || platform.status === "failed" ? (
              <button
                onClick={() => connectSocialMedia(platform.id)}
                className="w-full mt-2 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center"
              >
                <Link size={16} className="mr-2" />
                Conectar
              </button>
            ) : platform.status === "connected" ? (
              <div className="text-xs text-gray-400 mt-1">
                Última análise: {new Date().toLocaleDateString()}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Resultado da análise */}
      {analysisStatus !== "idle" && (
        <div className={`mb-6 p-4 rounded-lg ${
          analysisStatus === "analyzing" ? "bg-furia-dark" : 
          analysisStatus === "complete" ? "bg-gradient-to-r from-furia-purple/30 to-furia-gold/30" : 
          "bg-red-900/30"
        }`}>
          {analysisStatus === "analyzing" ? (
            <div className="flex items-center">
              <div className="animate-spin h-5 w-5 border-2 border-furia-gold border-t-transparent rounded-full mr-3"></div>
              <p className="text-white">Analisando seus perfis e interações...</p>
            </div>
          ) : analysisStatus === "complete" && analysisData ? (
            <div>
              <h3 className="text-white font-medium mb-2">Análise Concluída!</h3>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-furia-gold rounded-full mr-2"></span>
                  <span>Interações com FURIA: <strong>{analysisData.furiaInteractions}</strong></span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-furia-purple rounded-full mr-2"></span>
                  <span>Páginas de e-sports seguidas: <strong>{analysisData.esportsPages}</strong></span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-blue-400 rounded-full mr-2"></span>
                  <span>Conteúdo relevante encontrado: <strong>{analysisData.relevantContent}</strong></span>
                </li>
              </ul>
              <p className="text-white">
                Nível de fã recomendado: <span className={`font-bold ${getFanLevelColor(analysisData.recommendedLevel)}`}>
                  {analysisData.recommendedLevel === "casual" ? "FÃ CASUAL" : 
                   analysisData.recommendedLevel === "leal" ? "FÃ LEAL" : 
                   "FÃ FURIOSO"}
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle size={20} className="text-red-400 mr-3" />
              <p className="text-red-400">Ocorreu um erro durante a análise. Tente novamente.</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-600"
        >
          Voltar
        </button>
        
        <button
          onClick={analyzeConnections}
          disabled={!platforms.some(p => p.connected) || analysisStatus === "analyzing" || analysisStatus === "complete"}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${platforms.some(p => p.connected) && analysisStatus !== "analyzing" && analysisStatus !== "complete"
              ? "bg-furia-gold text-black hover:bg-furia-gold/90"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"}
          `}
        >
          {analysisStatus === "analyzing" ? "Analisando..." : "Analisar Conexões"}
        </button>
      </div>
    </motion.div>
  );
} 