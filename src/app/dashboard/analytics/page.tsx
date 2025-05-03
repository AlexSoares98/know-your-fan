"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  TooltipProps
} from "recharts";

type SentimentData = {
  name: string;
  value: number;
  color: string;
};

type HeatmapData = {
  hour: string;
  engajamento: number;
};

// Definindo a interface para o payload do tooltip para evitar o uso de 'any'
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
}

export default function AnalyticsPage() {
  // Dados inicializados diretamente, sem precisar do setter já que não mudam
  const [sentimentData] = useState<SentimentData[]>([
    { name: "Positivo", value: 65, color: "#4AE588" },
    { name: "Neutro", value: 25, color: "#FFD700" },
    { name: "Negativo", value: 10, color: "#FF4A4A" }
  ]);

  const [heatmapData] = useState<HeatmapData[]>([
    { hour: "00:00", engajamento: 10 },
    { hour: "03:00", engajamento: 5 },
    { hour: "06:00", engajamento: 8 },
    { hour: "09:00", engajamento: 30 },
    { hour: "12:00", engajamento: 45 },
    { hour: "15:00", engajamento: 75 },
    { hour: "18:00", engajamento: 100 },
    { hour: "21:00", engajamento: 85 }
  ]);

  // Em uma aplicação real, buscaríamos esses dados de uma API
  useEffect(() => {
    // Implementação futura de busca de dados
  }, []);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-furia-gray p-3 rounded-lg border border-gray-700 shadow-lg">
          <p className="text-white font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Analytics
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentimento de Tweets */}
        <motion.div
          className="bg-furia-gray p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-orbitron mb-4 text-white">Sentimento nos Tweets</h2>
          <p className="text-gray-400 mb-6">Análise de sentimento dos tweets sobre a FURIA nos últimos 30 dias</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center mt-4 space-x-6">
            {sentimentData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-300">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Horários de Engajamento */}
        <motion.div
          className="bg-furia-gray p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-orbitron mb-4 text-white">Horários de Engajamento</h2>
          <p className="text-gray-400 mb-6">Períodos do dia em que você mais interage com conteúdo da FURIA</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatmapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fill: '#BBB' }} 
                  axisLine={{ stroke: '#555' }}
                />
                <YAxis 
                  tick={{ fill: '#BBB' }} 
                  axisLine={{ stroke: '#555' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1C1C20', 
                    borderColor: '#555',
                    color: 'white'
                  }}
                  formatter={(value) => [`${value}%`, 'Engajamento']}
                />
                <Legend wrapperStyle={{ color: '#BBB' }} />
                <Bar 
                  dataKey="engajamento" 
                  name="Engajamento" 
                  fill="#884AE5" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between mt-6">
            <div className="text-center">
              <h3 className="text-furia-gold font-orbitron text-xl">18:00</h3>
              <p className="text-gray-400 text-sm">Horário de maior engajamento</p>
            </div>
            <div className="text-center">
              <h3 className="text-furia-purple font-orbitron text-xl">60%</h3>
              <p className="text-gray-400 text-sm">Taxa de engajamento noturna</p>
            </div>
            <div className="text-center">
              <h3 className="text-white font-orbitron text-xl">75%</h3>
              <p className="text-gray-400 text-sm">Interação durante jogos</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Estatísticas Adicionais */}
      <motion.div
        className="bg-furia-gray p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-orbitron mb-4 text-white">Estatísticas Adicionais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Menções à FURIA</p>
            <h3 className="text-2xl text-furia-gold font-orbitron">2.354</h3>
            <p className="text-green-500 text-xs mt-1">+12% vs mês anterior</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Suas interações</p>
            <h3 className="text-2xl text-furia-purple font-orbitron">35</h3>
            <p className="text-gray-400 text-xs mt-1">Últimos 30 dias</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Tempo médio na app</p>
            <h3 className="text-2xl text-white font-orbitron">8min</h3>
            <p className="text-green-500 text-xs mt-1">+3min vs primeira semana</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Afinidade com conteúdo</p>
            <h3 className="text-2xl text-furia-gold font-orbitron">82%</h3>
            <p className="text-green-500 text-xs mt-1">Baseado nas suas interações</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 