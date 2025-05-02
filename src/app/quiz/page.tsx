"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizResult {
  playerName: string;
  score: number;
  time: number;
  date: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Em que ano a organização FURIA foi fundada?',
    options: ['2016', '2017', '2018', '2019'],
    correctAnswer: 1          
  },
  {
    id: 2,
    question: 'Quem é o principal CEO e cofundador da FURIA?',
    options: ['Gaules', 'Jaime Pádua', 'André Akkari', 'FalleN'],
    correctAnswer: 1         
  },
  {
    id: 3,
    question: 'Complete a frase "Hoje tem clutch do..."?',
    options: ['FalleN', 'yuurih', 'KSCERATO', 'molodoy'],
    correctAnswer: 2       
  },
  {
    id: 4,
    question: 'Qual dupla de riflers ganhou o apelido de "Yuurato"?',
    options: [
      'yuurih + KSCERATO',
      'KSCERATO + FalleN',
      'KSCERATO + molodoy',
      'yuurih + YEKINDAR'
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: 'Qual é a nacionalidade do jogador YEKINDAR, stand-in da FURIA em 2025?',
    options: ['Brasileira', 'Letã', 'Russa', 'Polonesa'],
    correctAnswer: 1          
  },
  {
    id: 6,
    question: 'Qual jogadora exerce as funções de AWP na equipe feminina de CS2(FURIA fe)?',
    options: ['bizinha', 'gabs', 'izaa', 'kaahSENSEI'],
    correctAnswer: 3          
  },
  {
    id: 7,
    question: 'Quem é conhecido pelo apelido "Professor" da line masculina de CS2?',
    options: ['KSCERATO', 'FalleN', 'yuurih', 'molodoy'],
    correctAnswer: 1          
  },
  {
    id: 8,
    question: 'Qual foi o primeiro título S-Tier internacional da FURIA?',
    options: [
      'ESL Pro League Season 12 North America',
      'IEM New York NA 2020',
      'BLAST Premier Spring 2021',
      'DreamHack Masters Spring NA 2020'
    ],
    correctAnswer: 0          
  },
  {
    id: 9,
    question: 'Até o final de 2024, em quantos Majors completos a FURIA já participou?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1          
  },
  {
    id: 10,
    question: 'Quem era o coach principal da line masculina antes da temporada 2024?',
    options: ['guerri', 'zakk', 'peacemaker', 'zews'],
    correctAnswer: 0         
  }
];


export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [playerName, setPlayerName] = useState('');
  const [topResults, setTopResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Carregar os resultados anteriores do localStorage
    const savedResults = localStorage.getItem('furiaQuizResults');
    if (savedResults) {
      setTopResults(JSON.parse(savedResults));
    }
  }, []);

  const startQuiz = () => {
    if (!playerName.trim()) {
      alert('Por favor, digite seu nome para começar o quiz');
      return;
    }
    
    setQuizStarted(true);
    setStartTime(Date.now());
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const goToNextQuestion = () => {
    if (selectedOption !== null) {
      // Verificar se a resposta está correta
      if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
        setCorrectAnswers(prev => prev + 1);
      }
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setEndTime(Date.now());
        setQuizCompleted(true);

        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const newResult: QuizResult = {
          playerName,
          score: correctAnswers + (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer ? 1 : 0),
          time: timeTaken,
          date: new Date().toLocaleDateString()
        };
        
        const updatedResults = [...topResults, newResult].sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.time - b.time;
        }).slice(0, 5); 
        
        setTopResults(updatedResults);
        localStorage.setItem('furiaQuizResults', JSON.stringify(updatedResults));
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setShowResults(false);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const quizTime = endTime > 0 ? Math.floor((endTime - startTime) / 1000) : 0;

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-orbitron"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Quiz FURIA
      </motion.h1>
      
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-furia-gray rounded-xl p-6 shadow-lg"
        >
          {!quizStarted ? (
            <div className="text-center">
              <h2 className="text-3xl font-orbitron text-furia-gold mb-6">Quiz FURIA CS</h2>
              <p className="text-white mb-6">Teste seus conhecimentos sobre a FURIA e Counter-Strike!</p>
              
              <div className="mb-6">
                <label htmlFor="playerName" className="block text-white mb-2">Seu nome:</label>
                <input
                  type="text"
                  id="playerName"
                  className="bg-zinc-800 border border-zinc-700 text-white px-4 py-2 rounded w-full max-w-md mx-auto"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Digite seu nome para o ranking"
                />
              </div>
              
              <button 
                onClick={startQuiz}
                className="bg-furia-purple hover:bg-furia-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-6"
              >
                Iniciar Quiz
              </button>
              
              {topResults.length > 0 && (
                <button 
                  onClick={toggleResults}
                  className="block mx-auto text-furia-gold hover:underline"
                >
                  {showResults ? 'Esconder Ranking' : 'Ver Ranking'}
                </button>
              )}
              
              {showResults && (
                <div className="mt-6">
                  <h3 className="text-xl font-orbitron text-furia-gold mb-4">Top 5 Pontuações</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-2 px-4 text-white">Posição</th>
                          <th className="text-left py-2 px-4 text-white">Nome</th>
                          <th className="text-left py-2 px-4 text-white">Pontuação</th>
                          <th className="text-left py-2 px-4 text-white">Tempo</th>
                          <th className="text-left py-2 px-4 text-white">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topResults.map((result, index) => (
                          <tr key={index} className="border-b border-zinc-800">
                            <td className="py-2 px-4 text-white">{index + 1}</td>
                            <td className="py-2 px-4 text-white">{result.playerName}</td>
                            <td className="py-2 px-4 text-white">{result.score}/{quizQuestions.length}</td>
                            <td className="py-2 px-4 text-white">{result.time}s</td>
                            <td className="py-2 px-4 text-white">{result.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : !quizCompleted ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-orbitron text-furia-gold">Pergunta {currentQuestionIndex + 1}/{quizQuestions.length}</h2>
                <div className="text-white">
                  Pontuação: <span className="text-furia-gold font-bold">{correctAnswers}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-white text-xl mb-6">{currentQuestion.question}</p>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedOption === index 
                          ? 'bg-furia-gold text-black' 
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {option}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={goToNextQuestion}
                disabled={selectedOption === null}
                className={`bg-furia-purple hover:bg-furia-purple/90 text-white py-3 px-4 rounded-lg font-medium transition-colors w-full ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-orbitron text-furia-gold mb-4">Quiz Completo!</h2>
              
              <p className="text-white text-xl mb-2">Pontuação Final</p>
              <p className="text-3xl font-bold text-furia-gold mb-6">{correctAnswers}/{quizQuestions.length}</p>
              
              <p className="text-white mb-1">Tempo</p>
              <p className="text-xl font-bold text-furia-gold mb-8">{quizTime} segundos</p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={resetQuiz} 
                  className="bg-furia-purple hover:bg-furia-purple/90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Jogar Novamente
                </button>
                <button 
                  onClick={toggleResults} 
                  className="bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Ver Ranking
                </button>
              </div>
              
              {showResults && (
                <div className="mt-8">
                  <h3 className="text-xl font-orbitron text-furia-gold mb-4">Top 5 Pontuações</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-2 px-4 text-white">Posição</th>
                          <th className="text-left py-2 px-4 text-white">Nome</th>
                          <th className="text-left py-2 px-4 text-white">Pontuação</th>
                          <th className="text-left py-2 px-4 text-white">Tempo</th>
                          <th className="text-left py-2 px-4 text-white">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topResults.map((result, index) => (
                          <tr key={index} className="border-b border-zinc-800">
                            <td className="py-2 px-4 text-white">{index + 1}</td>
                            <td className="py-2 px-4 text-white">{result.playerName}</td>
                            <td className="py-2 px-4 text-white">{result.score}/{quizQuestions.length}</td>
                            <td className="py-2 px-4 text-white">{result.time}s</td>
                            <td className="py-2 px-4 text-white">{result.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 