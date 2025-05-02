"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, X, Heart, MessageSquare, Repeat } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

// Tipos
type Author = {
  name: string;
  username: string;
  avatar?: string;
};

type Post = {
  id: string;
  author: Author;
  content: string;
  createdAt: Date;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  liked: boolean;
};

/**
 * Página principal da seção de posts/comunidade
 * Permite visualizar e criar publicações com interação social
 */
export default function PostsPage() {
  // ===== Estado =====
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Afonso Brandão",
        username: "AfonsoB",
      },
      content: "🔥 FURIA mostrando por que é time de playoff! Que entrada de molodoy no mapa Inferno, cara!\n#FURIAxCS2",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      likes: 78,
      comments: 12,
      reposts: 8,
      liked: false,
    },
    {
      id: "2",
      author: {
        name: "Alex Silva",
        username: "AlexS",
      },
      content: "Acabei de receber minha nova camisa edição limitada \"Yuurato\"! 😍\nVale cada centavo. Quem mais comprou?\n#FURIAGG",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
      image: "/posts/camisa-furia.jpg",
      likes: 142,
      comments: 31,
      reposts: 23,
      liked: true,
    },
    {
      id: "3",
      author: {
        name: "Mariana Costa",
        username: "MariC",
      },
      content: "Vendo a análise do último jogo do KSCERATO. O cara simplesmente não erra, é absurdo o nível de precisão! 🎯\nAinda dá tempo de votar nele para melhor jogador do ano, pessoal!",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
      likes: 203,
      comments: 45,
      reposts: 72,
      liked: false,
    },
    {
      id: "4",
      author: {
        name: "Lucas Mendes",
        username: "LucasM",
      },
      content: "Alguém mais pegou a live do FalleN ontem? Que aula de AWP ele deu, mano... 👏\nOs highlights estão insanos! Eu estava lá e valeu cada segundo.",
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 horas atrás
      likes: 89,
      comments: 14,
      reposts: 7,
      liked: false,
    },
    {
      id: "5",
      author: {
        name: "Carol Almeida",
        username: "CarolA",
      },
      content: "Consegui o badge de Fã Furioso hoje!!! 🏆 Não foi fácil, tive que participar de todos os quizes e compartilhar bastante conteúdo, mas valeu super a pena! Os benefícios são incríveis!",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 horas atrás
      image: "/posts/badge-furioso.jpg",
      likes: 315,
      comments: 87,
      reposts: 42,
      liked: true,
    }
  ]);

  const [newPost, setNewPost] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [charactersLeft, setCharactersLeft] = useState<number>(500);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== Utilitários =====
  
  /**
   * Formata o tempo de postagem para exibição (ex: "2h", "5m")
   */
  const formatPostTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes < 1) return "agora";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  // ===== Handlers =====
  
  /**
   * Gerencia a mudança no campo de texto da nova publicação
   */
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    if (text.length <= 500) {
      setNewPost(text);
      setCharactersLeft(500 - text.length);
    }
  };

  /**
   * Abre o seletor de arquivo para adicionar imagem
   */
  const handleAddImage = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * Processa o upload da imagem selecionada
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Simula um upload, na vida real seria feito para um servidor/blob storage
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPostImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Remove a imagem selecionada
   */
  const handleRemoveImage = (): void => {
    setNewPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Publica o novo post
   */
  const handleSubmitPost = (): void => {
    if (newPost.trim() === "") return;
    
    const newPostObj: Post = {
      id: Date.now().toString(),
      author: {
        name: "Fã FURIA",
        username: "FaFURIA",
      },
      content: newPost,
      createdAt: new Date(),
      image: newPostImage || undefined,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setNewPostImage(null);
    setCharactersLeft(500);
    
    // Checar se a publicação pode conceder badges
    checkForBadgeEligibility(newPostObj);
  };

  /**
   * Gerencia a curtida em um post
   */
  const handleLikePost = (postId: string): void => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  /**
   * Verifica se o usuário é elegível para badges baseado na publicação
   */
  const checkForBadgeEligibility = (post: Post): void => {
    // Simulação - na implementação real, isso verificaria critérios específicos
    // e atualizaria o status de badges no backend
    
    const postContainsFuriaHashtag = post.content.includes("#FURIA") || 
                                    post.content.includes("#FURIAxCS2") || 
                                    post.content.includes("#FURIAGG");
    
    if (postContainsFuriaHashtag) {
      // Exibe toast informativo (simulado)
      console.log("Você está mais próximo do badge 'Fã Leal'!");
    }
  };

  // ===== Renderização =====
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <motion.h1 
        className="text-3xl font-orbitron mb-6 mt-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Comunidade <span className="text-furia-gold">FURIA</span>
      </motion.h1>
      
      <motion.div 
        className="bg-furia-gray rounded-xl p-4 mb-6 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <Avatar name="Fã FURIA" size="md" />
          
          <div className="flex-1">
            <textarea
              className="w-full p-3 rounded-lg bg-furia-dark text-white resize-none border border-furia-gray focus:border-furia-purple focus:outline-none transition-colors h-24"
              placeholder="O que está acontecendo no mundo FURIA?"
              value={newPost}
              onChange={handlePostChange}
            />
            
            {newPostImage && (
              <div className="relative mt-2 mb-3 h-48 rounded-lg overflow-hidden">
                <Image 
                  src={newPostImage} 
                  alt="Imagem anexada" 
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-furia-dark/80 rounded-full p-1 text-white hover:bg-furia-dark"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <button 
                  onClick={handleAddImage}
                  className="p-2 rounded-full text-furia-gold hover:bg-furia-dark/40 transition-colors"
                >
                  <ImageIcon size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-sm ${charactersLeft < 50 ? 'text-furia-gold' : 'text-gray-400'}`}>
                  {charactersLeft}
                </span>
                <button
                  onClick={handleSubmitPost}
                  disabled={newPost.trim() === ""}
                  className="bg-furia-purple hover:bg-furia-purple/80 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Publicar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="space-y-0 divide-y divide-furia-gray/30 border-y border-furia-gray/30">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="py-4 px-2 hover:bg-furia-gray/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            <div className="flex gap-3">
              <Avatar name={post.author.name} size="md" className="flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap">
                  <span className="font-semibold truncate">{post.author.name}</span>
                  <span className="text-gray-400 text-sm ml-1 truncate">@{post.author.username}</span>
                  <span className="text-gray-400 text-sm ml-2">· {formatPostTime(post.createdAt)}</span>
                </div>
                
                <div className="mt-1 whitespace-pre-line text-[15px]">{post.content}</div>
                
                {post.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-furia-gray/20">
                    <Image 
                      src={post.image} 
                      alt="Imagem do post" 
                      width={600}
                      height={400}
                      className="object-cover w-full max-h-96"
                    />
                  </div>
                )}
                
                <div className="flex items-center mt-3 gap-6 -ml-2">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1 text-sm ${post.liked ? 'text-furia-gold' : 'text-gray-400'} hover:text-furia-gold transition-colors p-2 rounded-full hover:bg-furia-gold/10`}
                  >
                    <Heart size={18} className={post.liked ? "fill-furia-gold" : ""} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-furia-purple transition-colors p-2 rounded-full hover:bg-furia-purple/10">
                    <MessageSquare size={18} />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-furia-purple transition-colors p-2 rounded-full hover:bg-furia-purple/10">
                    <Repeat size={18} />
                    <span>{post.reposts}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-furia-dark rounded-xl p-6 border border-furia-purple/20 mt-10 mb-8 shadow-md">
        <h2 className="text-2xl font-orbitron text-furia-gold mb-4">Ganhe badges interagindo!</h2>
        <p className="text-gray-300 mb-4">
          Sabia que você pode ganhar os badges de Fã Leal e Fã Furioso interagindo na comunidade? Veja como:
        </p>
        
        <ul className="text-gray-300 space-y-3">
          <li className="flex items-start">
            <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
            <div>
              <span className="font-medium">Badge Fã Leal:</span> Faça pelo menos 5 publicações usando hashtags da FURIA (#FURIA, #FURIAGG, #FURIAxCS2)
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-furia-gold text-furia-dark rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
            <div>
              <span className="font-medium">Badge Fã Furioso:</span> Tenha 10 ou mais publicações com pelo menos 50 curtidas cada e compartilhe fotos de produtos oficiais da FURIA
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
} 