"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Player = {
  id: string;
  name: string;
  image: string;
  game: string;
};

type ContentType = "noticias" | "analises" | "memes" | "highlights";
type Frequency = "diaria" | "semanal" | "mensal";
type SocialPlatform = "youtube" | "instagram" | "x" | "discord";
type Device = "desktop" | "mobile" | "tablet";
type AgeRange = "abaixo18" | "18a24" | "25a34" | "35a44" | "acima45";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulação de dados de jogadores
  const players: Player[] = [
    { id: "1", name: "FalleN", image: "/player-images/FalleN-furia.webp", game: "CS2" },
    { id: "2", name: "yuurih", image: "/player-images/yuurih-furia.webp", game: "CS2" },
    { id: "3", name: "KSCERATO", image: "/player-images/KSCERATO-furia.webp", game: "CS2" },
    { id: "4", name: "YEKINDAR", image: "/player-images/YEKINDAR-furia.webp", game: "CS2" },
    { id: "5", name: "molodoy", image: "/player-images/molodoy-furia.webp", game: "CS2" },
  ];

  const contentTypes: { id: ContentType; label: string }[] = [
    { id: "noticias", label: "Notícias e atualizações" },
    { id: "analises", label: "Análises táticas" },
    { id: "memes", label: "Memes e humor" },
    { id: "highlights", label: "Highlights de partidas" },
  ];

  const frequencies: { id: Frequency; label: string }[] = [
    { id: "diaria", label: "Diariamente" },
    { id: "semanal", label: "Semanalmente" },
    { id: "mensal", label: "Mensalmente" },
  ];
  
  const socialPlatforms: { id: SocialPlatform; label: string; icon: string }[] = [
    { id: "youtube", label: "YouTube", icon: "🎬" },
    { id: "instagram", label: "Instagram", icon: "📷" },
    { id: "x", label: "X (Twitter)", icon: "🐦" },
    { id: "discord", label: "Discord", icon: "💬" },
  ];
  
  const devices: { id: Device; label: string; icon: string }[] = [
    { id: "desktop", label: "Desktop", icon: "💻" },
    { id: "mobile", label: "Mobile", icon: "📱" },
    { id: "tablet", label: "Tablet", icon: "📟" },
  ];

  const ageRanges: { id: AgeRange; label: string }[] = [
    { id: "abaixo18", label: "Menos de 18 anos" },
    { id: "18a24", label: "18 a 24 anos" },
    { id: "25a34", label: "25 a 34 anos" },
    { id: "35a44", label: "35 a 44 anos" },
    { id: "acima45", label: "Acima de 45 anos" },
  ];

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = async () => {
    setLoading(true);
    
    // Simulação do salvamento de dados
    const userData = {
      favoritePlayer: selectedPlayer,
      contentPreference: selectedContentType,
      frequency: selectedFrequency,
      socialPlatform: selectedPlatform,
      device: selectedDevice,
      age: selectedAgeRange
    };
    
    // Em uma app real, isto seria enviado para uma API
    localStorage.setItem("furia-fan-preferences", JSON.stringify(userData));
    localStorage.setItem("furia-fan-onboarding-complete", "true");
    
    // Simulando um tempo de processamento
    setTimeout(() => {
      router.push("/dashboard/overview");
    }, 1500);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedPlayer;
      case 2:
        return !!selectedContentType;
      case 3:
        return !!selectedFrequency;
      case 4:
        return !!selectedPlatform;
      case 5:
        return !!selectedDevice;
      case 6:
        return !!selectedAgeRange;
      default:
        return false;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-furia-dark">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/icons/furia-logo.png"
              alt="FURIA Logo"
              width={60}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl font-orbitron text-white">
            <span className="text-furia-gold">FURIA</span> Fan Hub
          </h1>
          <p className="text-gray-400 mt-2">Vamos personalizar sua experiência</p>
        </div>

        <div className="bg-furia-gray rounded-xl shadow-xl p-6 md:p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center rounded-full h-10 w-10 transition-colors
                  ${s === step
                    ? "bg-furia-gold text-furia-dark font-bold"
                    : s < step
                    ? "bg-furia-purple text-white"
                    : "bg-furia-gray border border-gray-700 text-gray-400"
                  }
                `}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait" initial={false} custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Qual é o seu jogador  de CS2 favorito da FURIA?
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {players.slice(0, 3).map((player) => (
                    <div
                      key={player.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedPlayer === player.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedPlayer(player.id)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[70px] h-[120px] relative mb-2">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <h3 className="text-white font-medium text-center">{player.name}</h3>
                        <p className="text-gray-400 text-sm text-center">{player.game}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {players.slice(3, 5).map((player) => (
                    <div
                      key={player.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedPlayer === player.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedPlayer(player.id)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[70px] h-[120px] relative mb-2">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <h3 className="text-white font-medium text-center">{player.name}</h3>
                        <p className="text-gray-400 text-sm text-center">{player.game}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Que tipo de conteúdo você prefere?
                </h2>
                
                <div className="space-y-3">
                  {contentTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedContentType === type.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedContentType(type.id)}
                    >
                      <h3 className="text-white font-medium">{type.label}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Com que frequência você gostaria de receber atualizações?
                </h2>
                
                <div className="space-y-3">
                  {frequencies.map((freq) => (
                    <div
                      key={freq.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedFrequency === freq.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedFrequency(freq.id)}
                    >
                      <h3 className="text-white font-medium">{freq.label}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {step === 4 && (
              <motion.div
                key="step4"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Onde você interage mais com a comunidade da FURIA?
                </h2>
                
                <div className="space-y-3">
                  {socialPlatforms.map((platform) => (
                    <div
                      key={platform.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedPlatform === platform.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedPlatform(platform.id)}
                    >
                      <h3 className="text-white font-medium">{platform.icon} {platform.label}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {step === 5 && (
              <motion.div
                key="step5"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Em qual dispositivo você costuma usar o app?
                </h2>
                
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedDevice === device.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedDevice(device.id)}
                    >
                      <h3 className="text-white font-medium">{device.icon} {device.label}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-orbitron text-white mb-6">
                  Qual a sua idade?
                </h2>
                
                <div className="space-y-3">
                  {ageRanges.map((range) => (
                    <div
                      key={range.id}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${selectedAgeRange === range.id
                          ? "bg-furia-purple border-2 border-furia-gold"
                          : "bg-gray-800 hover:bg-gray-700"}
                      `}
                      onClick={() => setSelectedAgeRange(range.id)}
                    >
                      <h3 className="text-white font-medium">{range.label}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-furia-gold"></div>
              <span className="ml-3 text-white">Preparando seu painel personalizado...</span>
            </div>
          )}

          {/* Navigation Buttons */}
          {!loading && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className={`
                  px-6 py-2 rounded-lg font-medium
                  ${step === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"}
                `}
                disabled={step === 1}
              >
                Voltar
              </button>
              
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`
                  px-6 py-2 rounded-lg font-medium transition-colors
                  ${canProceed()
                    ? "bg-furia-purple text-white hover:bg-furia-purple/90"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"}
                `}
              >
                {step === 6 ? "Finalizar" : "Próximo"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 