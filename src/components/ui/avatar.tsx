"use client";

import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  size = 'md', 
  className = '' 
}) => {
  // Gerar as iniciais (até 2 caracteres)
  const getInitials = () => {
    if (!name) return '';
    
    const names = name.split(' ').filter(n => n.length > 0);
    
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };
  
  // Gerar cor baseada no nome (para ser consistente para o mesmo usuário)
  const generateColor = () => {
    if (!name) return '#6c5ce7'; // Cor padrão
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Lista de cores no padrão da FURIA
    const colors = [
      'bg-furia-purple',
      'bg-furia-gold',
      'bg-blue-500',
      'bg-green-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-orange-500'
    ];
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  // Definir tamanho
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${generateColor()} 
        rounded-full flex items-center justify-center font-medium text-white
        ${className}
      `}
    >
      {getInitials()}
    </div>
  );
}; 