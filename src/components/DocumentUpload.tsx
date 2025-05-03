import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, X, Check, AlertCircle, FileText } from "lucide-react";

type DocumentUploadProps = {
  onComplete: (validated: boolean) => void;
  onBack: () => void;
};

type DocumentStatus = "idle" | "uploading" | "validating" | "validated" | "failed";

export default function DocumentUpload({ onComplete, onBack }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Array<{
    id: string;
    name: string;
    type: string;
    status: DocumentStatus;
    preview?: string;
  }>>([]);
  
  const [dragActive, setDragActive] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "success" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Processar os arquivos
    Array.from(files).forEach(file => {
      // Verificar se o arquivo é uma imagem ou PDF
      if (!file.type.match('image.*') && file.type !== 'application/pdf') {
        alert('Por favor, envie apenas imagens ou PDFs');
        return;
      }

      const id = Math.random().toString(36).substring(2, 9);
      
      const newDocument = {
        id,
        name: file.name,
        type: file.type,
        status: "uploading" as DocumentStatus
      };

      // Se for imagem, cria preview
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === id 
                ? { ...doc, preview: e.target?.result as string } 
                : doc
            )
          );
        };
        reader.readAsDataURL(file);
      }

      setDocuments(prev => [...prev, newDocument]);

      // Simula upload
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === id ? { ...doc, status: "validating" } : doc
          )
        );
        
        // Simula validação da IA
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === id ? { ...doc, status: "validated" } : doc
            )
          );
        }, 3000);
      }, 1500);
    });
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const validateIdentity = () => {
    if (documents.length === 0) {
      setValidationMessage("Por favor, envie ao menos um documento para validação.");
      return;
    }

    setValidationStatus("validating");
    setValidationMessage("Validando sua identidade, aguarde...");

    // Simula um processo de validação de identidade
    setTimeout(() => {
      // Verifica se todos os documentos foram validados
      const allValidated = documents.every(doc => doc.status === "validated");
      
      if (allValidated) {
        setValidationStatus("success");
        setValidationMessage("Identidade validada com sucesso!");
        
        // Notifica o componente pai após 2 segundos
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      } else {
        setValidationStatus("error");
        setValidationMessage("Não foi possível validar sua identidade. Tente enviar outros documentos.");
      }
    }, 4000);
  };

  const renderDocumentStatus = (status: DocumentStatus) => {
    switch (status) {
      case "uploading":
        return (
          <div className="animate-pulse bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
            Enviando...
          </div>
        );
      case "validating":
        return (
          <div className="bg-furia-purple text-white px-3 py-1 rounded-full text-xs flex items-center">
            <span className="animate-pulse mr-1">•</span> Validando
          </div>
        );
      case "validated":
        return (
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center">
            <Check size={12} className="mr-1" /> Validado
          </div>
        );
      case "failed":
        return (
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center">
            <X size={12} className="mr-1" /> Falha
          </div>
        );
      default:
        return null;
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
        Validação de Identidade
      </h2>
      <p className="text-gray-400 mb-6">
        Envie um documento com foto (RG, CNH ou Passaporte) para validarmos sua identidade.
      </p>

      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 mb-6 text-center
          ${dragActive 
            ? "border-furia-gold bg-furia-gold/10" 
            : "border-gray-600 hover:border-gray-500"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload size={48} className="text-gray-500 mb-4" />
          <p className="text-white font-medium mb-2">Arraste e solte seu documento aqui</p>
          <p className="text-gray-400 text-sm mb-4">ou</p>
          <label 
            htmlFor="file-upload" 
            className="px-4 py-2 bg-furia-purple text-white rounded-lg cursor-pointer hover:bg-furia-purple/80"
          >
            Selecionar Arquivo
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-gray-400 text-xs mt-4">
            Formatos aceitos: JPG, PNG, PDF (máx. 10MB)
          </p>
        </div>
      </div>

      {documents.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Documentos enviados:</h3>
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="bg-furia-dark rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  {doc.preview ? (
                    <div className="w-12 h-12 rounded overflow-hidden mr-3 relative">
                      <Image 
                        src={doc.preview} 
                        alt={doc.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <FileText size={24} className="text-gray-400 mr-3" />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{doc.name}</p>
                    <p className="text-gray-400 text-xs">{Math.floor(Math.random() * 1000) / 100} MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {renderDocumentStatus(doc.status)}
                  <button 
                    onClick={() => removeDocument(doc.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {validationStatus !== "idle" && (
        <div className={`mb-6 p-4 rounded-lg ${
          validationStatus === "validating" ? "bg-furia-dark" :
          validationStatus === "success" ? "bg-green-900/30" :
          "bg-red-900/30"
        }`}>
          <div className="flex items-center">
            {validationStatus === "validating" ? (
              <div className="animate-spin h-5 w-5 border-2 border-furia-gold border-t-transparent rounded-full mr-3"></div>
            ) : validationStatus === "success" ? (
              <Check size={20} className="text-green-400 mr-3" />
            ) : (
              <AlertCircle size={20} className="text-red-400 mr-3" />
            )}
            <p className={`text-sm ${
              validationStatus === "success" ? "text-green-400" :
              validationStatus === "error" ? "text-red-400" :
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
          onClick={validateIdentity}
          disabled={documents.length === 0 || validationStatus === "validating" || validationStatus === "success"}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${documents.length > 0 && validationStatus !== "validating" && validationStatus !== "success"
              ? "bg-furia-gold text-black hover:bg-furia-gold/90"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"}
          `}
        >
          {validationStatus === "validating" ? "Validando..." : "Validar Identidade"}
        </button>
      </div>
    </motion.div>
  );
} 