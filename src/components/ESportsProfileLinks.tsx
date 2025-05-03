import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, AlertCircle, X, Link2, Loader2 } from "lucide-react";

type ESportsProfileLinksProps = {
  onComplete: (validated: boolean) => void;
  onBack: () => void;
};

type ProfileLink = {
  id: string;
  platform: string;
  link: string;
  status: "idle" | "validating" | "validated" | "invalid";
  relevance?: number;
};

export default function ESportsProfileLinks({ onComplete, onBack }: ESportsProfileLinksProps) {
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [currentLink, setCurrentLink] = useState("");
  const [currentPlatform, setCurrentPlatform] = useState("faceit");
  const [isValidating, setIsValidating] = useState(false);

  const [overallStatus, setOverallStatus] = useState<"idle" | "validating" | "complete" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");

  const eSportsPlatforms = [
    { id: "faceit", name: "FACEIT" },
    { id: "esea", name: "ESEA" },
    { id: "gamersclub", name: "Gamers Club" },
    { id: "battlefy", name: "Battlefy" },
    { id: "challengermode", name: "Challengermode" },
    { id: "leetify", name: "Leetify" }
  ];

  const handleAddLink = () => {
    // Verificação básica de URL
    if (!currentLink || !currentLink.trim() || !currentLink.includes("http")) {
      alert("Por favor, insira um link válido começando com http:// ou https://");
      return;
    }

    const id = Math.random().toString(36).substring(2, 9);
    
    // Adiciona o novo link
    setLinks(prev => [
      ...prev, 
      { 
        id, 
        platform: currentPlatform,
        link: currentLink,
        status: "idle"
      }
    ]);

    // Limpa o campo
    setCurrentLink("");
  };

  const validateLink = (id: string) => {
    setLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, status: "validating" } : link
      )
    );

    // Simula validação por IA
    setTimeout(() => {
      // 80% de chance de ser válido para demonstração
      const isValid = Math.random() > 0.2;
      const relevance = isValid ? Math.floor(Math.random() * 90) + 10 : 0;
      
      setLinks(prev => 
        prev.map(link => 
          link.id === id 
            ? { 
                ...link, 
                status: isValid ? "validated" : "invalid",
                relevance: isValid ? relevance : 0
              } 
            : link
        )
      );
    }, 2500);
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleFinalValidation = () => {
    const validatedLinks = links.filter(link => link.status === "validated");
    
    if (validatedLinks.length === 0) {
      setValidationMessage("Você precisa ter pelo menos um perfil validado para continuar.");
      return;
    }

    setOverallStatus("validating");
    setIsValidating(true);
    setValidationMessage("Analisando seus perfis de e-sports...");

    // Simula análise completa dos perfis
    setTimeout(() => {
      // Calcula pontuação média de relevância
      const totalRelevance = validatedLinks.reduce((acc, link) => acc + (link.relevance || 0), 0);
      const averageRelevance = totalRelevance / validatedLinks.length;

      if (averageRelevance > 40) {
        setOverallStatus("complete");
        setValidationMessage(`Perfis validados com sucesso! Pontuação de relevância: ${Math.floor(averageRelevance)}/100`);
        
        // Notifica o componente pai após 2 segundos
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      } else {
        setOverallStatus("error");
        setValidationMessage(`Relevância de perfil insuficiente (${Math.floor(averageRelevance)}/100). Adicione mais perfis relacionados a e-sports.`);
      }

      setIsValidating(false);
    }, 4000);
  };

  const getPlatformName = (platformId: string) => {
    const platform = eSportsPlatforms.find(p => p.id === platformId);
    return platform ? platform.name : platformId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-furia-gray rounded-xl shadow-xl p-6 md:p-8 w-full max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-orbitron text-white mb-2">
        Seus Perfis de E-Sports
      </h2>
      <p className="text-gray-400 mb-6">
        Adicione links para seus perfis em plataformas de e-sports para melhorar suas recomendações.
      </p>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="profileLink" className="block text-gray-400 mb-1">
              Link do Perfil
            </label>
            <input
              type="url"
              id="profileLink"
              value={currentLink}
              onChange={(e) => setCurrentLink(e.target.value)}
              placeholder="https://www.faceit.com/seu-perfil"
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="platform" className="block text-gray-400 mb-1">
              Plataforma
            </label>
            <select
              id="platform"
              value={currentPlatform}
              onChange={(e) => setCurrentPlatform(e.target.value)}
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
            >
              {eSportsPlatforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleAddLink}
          disabled={!currentLink.trim()}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center
            ${currentLink.trim()
              ? "bg-furia-purple text-white hover:bg-furia-purple/90"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"}
          `}
        >
          <Link2 size={16} className="mr-2" />
          Adicionar Perfil
        </button>
      </div>

      {/* Lista de links */}
      {links.length > 0 && (
        <div className="mb-8">
          <h3 className="text-white font-medium mb-3">Perfis adicionados:</h3>
          <div className="space-y-3">
            {links.map(link => (
              <div key={link.id} className="bg-furia-dark rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <span className="text-white font-medium">{getPlatformName(link.platform)}</span>
                      {link.status === "validating" && (
                        <span className="ml-2 bg-furia-purple text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Loader2 size={10} className="mr-1 animate-spin" /> Validando
                        </span>
                      )}
                      {link.status === "validated" && (
                        <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Check size={10} className="mr-1" /> Validado
                        </span>
                      )}
                      {link.status === "invalid" && (
                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                          <X size={10} className="mr-1" /> Inválido
                        </span>
                      )}
                    </div>
                    <a 
                      href={link.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm flex items-center mt-1"
                    >
                      {link.link.length > 40 ? link.link.substring(0, 40) + "..." : link.link}
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    {link.status === "idle" && (
                      <button
                        onClick={() => validateLink(link.id)}
                        className="text-furia-gold hover:text-furia-gold/80"
                      >
                        Validar
                      </button>
                    )}
                    <button
                      onClick={() => removeLink(link.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                
                {link.status === "validated" && link.relevance && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-xs mr-2">Relevância:</span>
                      <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            link.relevance > 70 ? "bg-furia-gold" : 
                            link.relevance > 40 ? "bg-furia-purple" : 
                            "bg-blue-500"
                          }`}
                          style={{ width: `${link.relevance}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs ml-2">{link.relevance}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem de validação */}
      {overallStatus !== "idle" && (
        <div className={`mb-6 p-4 rounded-lg ${
          overallStatus === "validating" ? "bg-furia-dark" :
          overallStatus === "complete" ? "bg-green-900/30" :
          "bg-red-900/30"
        }`}>
          <div className="flex items-center">
            {overallStatus === "validating" ? (
              <div className="animate-spin h-5 w-5 border-2 border-furia-gold border-t-transparent rounded-full mr-3"></div>
            ) : overallStatus === "complete" ? (
              <Check size={20} className="text-green-400 mr-3" />
            ) : (
              <AlertCircle size={20} className="text-red-400 mr-3" />
            )}
            <p className={`text-sm ${
              overallStatus === "complete" ? "text-green-400" :
              overallStatus === "error" ? "text-red-400" :
              "text-white"
            }`}>
              {validationMessage}
            </p>
          </div>
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
          onClick={handleFinalValidation}
          disabled={links.length === 0 || links.filter(l => l.status === "validated").length === 0 || isValidating || overallStatus === "complete"}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${links.length > 0 && links.filter(l => l.status === "validated").length > 0 && !isValidating && overallStatus !== "complete"
              ? "bg-furia-gold text-black hover:bg-furia-gold/90"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"}
          `}
        >
          {isValidating ? "Analisando..." : "Validar Perfis"}
        </button>
      </div>
    </motion.div>
  );
} 