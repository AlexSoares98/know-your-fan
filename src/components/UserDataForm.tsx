import { useState } from "react";
import { motion } from "framer-motion";

type UserDataFormProps = {
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
};

export type UserFormData = {
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cpf: string;
  interesses: string[];
  eventos: string[];
  compras: string[];
};

export default function UserDataForm({ onSubmit, onCancel }: UserDataFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    cpf: "",
    interesses: [],
    eventos: [],
    compras: []
  });

  const [interestInput, setInterestInput] = useState("");
  const [eventInput, setEventInput] = useState("");
  const [purchaseInput, setPurchaseInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Formatação de CPF: 000.000.000-00
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setFormData((prev) => ({ ...prev, cpf: value }));
    }
  };

  // Formatação de CEP: 00000-000
  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
      setFormData((prev) => ({ ...prev, cep: value }));
    }
  };

  const addItem = (field: "interesses" | "eventos" | "compras", value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      
      // Reset input
      if (field === "interesses") setInterestInput("");
      else if (field === "eventos") setEventInput("");
      else setPurchaseInput("");
    }
  };

  const removeItem = (field: "interesses" | "eventos" | "compras", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.nome.trim() !== "" &&
      formData.endereco.trim() !== "" &&
      formData.cidade.trim() !== "" &&
      formData.estado.trim() !== "" &&
      formData.cep.trim() !== "" &&
      formData.cpf.trim() !== ""
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-furia-gray rounded-xl shadow-xl p-6 md:p-8 w-full max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-orbitron text-white mb-6">
        Dados Pessoais
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="nome" className="block text-gray-400 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="cpf" className="block text-gray-400 mb-1">
              CPF *
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              maxLength={14}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="endereco" className="block text-gray-400 mb-1">
              Endereço *
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="cidade" className="block text-gray-400 mb-1">
              Cidade *
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="estado" className="block text-gray-400 mb-1">
              Estado *
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              required
            >
              <option value="">Selecione...</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>

          <div>
            <label htmlFor="cep" className="block text-gray-400 mb-1">
              CEP *
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleCEPChange}
              placeholder="00000-000"
              className="w-full p-3 rounded-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              maxLength={9}
              required
            />
          </div>
        </div>

        {/* Interesses */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-1">
            Interesses em e-sports
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="flex-1 p-3 rounded-l-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              placeholder="CS2, League of Legends, Valorant, etc."
            />
            <button
              type="button"
              onClick={() => addItem("interesses", interestInput)}
              className="bg-furia-purple text-white px-4 rounded-r-lg hover:bg-furia-purple/80"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.interesses.map((item, index) => (
              <div key={index} className="bg-furia-dark px-3 py-1 rounded-full flex items-center">
                <span className="text-white">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem("interesses", index)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-1">
            Eventos que gostaria de participar
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              className="flex-1 p-3 rounded-l-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              placeholder="ESL One, Major, BLAST Premier, etc."
            />
            <button
              type="button"
              onClick={() => addItem("eventos", eventInput)}
              className="bg-furia-purple text-white px-4 rounded-r-lg hover:bg-furia-purple/80"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.eventos.map((item, index) => (
              <div key={index} className="bg-furia-dark px-3 py-1 rounded-full flex items-center">
                <span className="text-white">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem("eventos", index)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compras */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-1">
            Produtos da FURIA que comprou no último ano
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={purchaseInput}
              onChange={(e) => setPurchaseInput(e.target.value)}
              className="flex-1 p-3 rounded-l-lg bg-furia-dark border border-gray-700 text-white focus:border-furia-gold focus:outline-none"
              placeholder="Camisa, moletom, boné, etc."
            />
            <button
              type="button"
              onClick={() => addItem("compras", purchaseInput)}
              className="bg-furia-purple text-white px-4 rounded-r-lg hover:bg-furia-purple/80"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.compras.map((item, index) => (
              <div key={index} className="bg-furia-dark px-3 py-1 rounded-full flex items-center">
                <span className="text-white">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem("compras", index)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-600"
          >
            Voltar
          </button>
          
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`
              px-6 py-2 rounded-lg font-medium transition-colors
              ${isFormValid()
                ? "bg-furia-gold text-black hover:bg-furia-gold/90"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"}
            `}
          >
            Continuar
          </button>
        </div>
      </form>
    </motion.div>
  );
} 