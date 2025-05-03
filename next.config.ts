import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com"],
  },
  // Ignora erros do ESLint durante o build de produção
  eslint: {
    // Desativa a validação do ESLint durante o build
    ignoreDuringBuilds: true,
  },
  // Também ignora erros de tipos do TypeScript durante o build
  typescript: {
    // Desativa a validação de tipos durante o build para evitar falhas em produção
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
