"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart2, 
  ThumbsUp, 
  Settings, 
  LogOut,
  Menu,
  X,
  Award,
  HelpCircle,
  MessageSquare,
  Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SidebarProps {
  onSignOut: () => void;
}

export function Sidebar({ onSignOut }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const menuItems = [
    {
      path: "/dashboard/overview",
      name: "Visão Geral",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      path: "/dashboard/connections",
      name: "Conexões Sociais",
      icon: <LinkIcon className="h-5 w-5" />
    },
    {
      path: "/dashboard/recommendations",
      name: "Recomendações",
      icon: <ThumbsUp className="h-5 w-5" />
    },
    {
      path: "/posts",
      name: "Comunidade",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      path: "/quiz",
      name: "Quiz",
      icon: <HelpCircle className="h-5 w-5" />
    },
    {
      path: "/badges",
      name: "Badges",
      icon: <Award className="h-5 w-5" />
    },
    {
      path: "/settings",
      name: "Configurações",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <aside className={`
      h-screen fixed left-0 top-0 z-40 
      bg-furia-dark border-r border-border
      transition-all duration-300 ease-in-out
      ${collapsed ? "w-16" : "w-64"}
      flex-shrink-0 md:block
    `}>
      <div className="flex flex-col h-full px-3 py-4">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <Link href="/dashboard/overview" className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image src="/icons/furia-logo.png" alt="FURIA Logo" fill className="object-contain" />
              </div>
              <h1 className="text-lg font-orbitron text-furia-gold">FURIA FAN</h1>
            </Link>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:bg-furia-gray"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 space-y-1">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`
                      flex items-center px-3 py-2 rounded-md mb-1
                      ${isActive 
                        ? "bg-furia-purple text-white" 
                        : "text-gray-400 hover:bg-furia-gray hover:text-white"}
                      transition-colors duration-200
                    `}
                  >
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                    {collapsed && isActive && (
                      <div className="absolute left-12 w-2 h-2 rounded-full bg-furia-gold"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="mt-auto border-t border-border pt-4">
          <button
            onClick={onSignOut}
            className="flex items-center px-3 py-2 w-full text-left rounded-md text-gray-400 hover:bg-furia-gray hover:text-white transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </div>
    </aside>
  );
} 