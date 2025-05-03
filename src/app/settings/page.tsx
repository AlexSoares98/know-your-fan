"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Moon, 
  Sun, 
  Download, 
  Trash2, 
  Save, 
  AlertTriangle, 
  CheckCircle
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const saveSettings = () => {
    // Em uma aplicação real, enviaríamos essas configurações para o backend
    setSuccessMessage("Configurações salvas com sucesso!");
    
    // Limpar a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  const exportUserData = () => {
    // Em uma aplicação real, geraria um arquivo JSON com os dados do usuário
    const userData = {
      theme: theme,
      notifications: {
        email: emailNotifications,
        push: pushNotifications
      },
      preferences: JSON.parse(localStorage.getItem("furia-fan-preferences") || "{}")
    };
    
    // Converter os dados para uma string JSON formatada
    const dataStr = JSON.stringify(userData, null, 2);
    
    // Criar um objeto Blob e link para download
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "furia-fan-data.json";
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
    
    setSuccessMessage("Dados exportados com sucesso!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  const handleDeleteAccount = () => {
    if (isDeleting) {
      // Em uma aplicação real, enviaríamos uma solicitação para excluir a conta
      // Vamos apenas simular com localStorage
      localStorage.removeItem("furia-fan-session");
      localStorage.removeItem("furia-fan-preferences");
      localStorage.removeItem("furia-fan-onboarding-complete");
      
      // Redirecionar para a página inicial
      router.push("/");
    } else {
      setIsDeleting(true);
    }
  };
  
  const cancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className="space-y-6 container mx-auto px-4 md:px-8 py-8 md:py-12">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Configurações
      </motion.h1>
      
      {/* Alertas */}
      {successMessage && (
        <motion.div 
          className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          {successMessage}
        </motion.div>
      )}
      
      {errorMessage && (
        <motion.div 
          className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          {errorMessage}
        </motion.div>
      )}
      
      {/* Aparência */}
      <motion.div 
        className="bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-orbitron mb-4 text-white">Aparência</h2>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-700">
          <div>
            <h3 className="text-white font-medium">Tema</h3>
            <p className="text-gray-400 text-sm">Alternar entre tema claro e escuro</p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>
      
      {/* Notificações */}
      <motion.div 
        className="bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-xl font-orbitron mb-4 text-white">Notificações</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div>
              <h3 className="text-white font-medium">Notificações por email</h3>
              <p className="text-gray-400 text-sm">Receba atualizações sobre partidas e promoções</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-furia-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div>
              <h3 className="text-white font-medium">Notificações push</h3>
              <p className="text-gray-400 text-sm">Receba notificações em tempo real no navegador</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-furia-purple"></div>
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* Privacidade */}
      <motion.div 
        className="bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-orbitron mb-4 text-white">Privacidade</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-3 border-b border-gray-700">
            <div>
              <h3 className="text-white font-medium">Exportar seus dados</h3>
              <p className="text-gray-400 text-sm">Baixe uma cópia de todos os seus dados</p>
            </div>
            
            <button
              onClick={exportUserData}
              className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar dados
            </button>
          </div>
          
          <div className="flex flex-col gap-4 py-3">
            <div>
              <h3 className="text-white font-medium">Excluir conta</h3>
              <p className="text-gray-400 text-sm">Exclua permanentemente sua conta e todos os seus dados</p>
            </div>
            
            {isDeleting ? (
              <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg">
                <p className="text-white mb-4">Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sim, excluir minha conta
                  </button>
                  
                  <button
                    onClick={cancelDelete}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir minha conta
              </button>
            )}
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-end pt-4">
        <button
          onClick={saveSettings}
          className="flex items-center justify-center bg-furia-gold hover:bg-furia-gold/90 text-black px-6 py-2 rounded-lg transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Salvar configurações
        </button>
      </div>
    </div>
  );
} 