
O FURIA Fan é uma plataforma para entender, segmentar e engajar fãs da FURIA a partir dos seus dados sociais e interações.

## Funcionalidades Principais

1. **Login Social**
   - Entrar com Twitter, Google ou Discord em poucos cliques.

2. **Onboarding Personalizado**
   - 3 perguntas para registrar preferências (jogador favorito, frequência, tipo de conteúdo).

3. **Dashboard – Visão Geral**
   - Perfil do fã (avatar, nível de fã, jogador favorito).
   - Próximas partidas e status ao vivo.

4. **Dashboard – Analytics**
   - Heatmap de "horários de maior engajamento".
   - Gráfico de sentimento: tweets positivos x negativos sobre a FURIA.

5. **Dashboard – Recomendações**
   - Cards que sugerem ação: "Assista ao jogo hoje", "Confira a nova camiseta", "Participe do quiz".

6. **Level Badges**
   - Exibe um selo (Casual, Leal ou Furioso) baseado no engajamento e histórico de compras.

7. **Configurações**
   - Alternar tema dark/light.
   - Exportar seus dados (LGPD).
   - Excluir conta (privacidade).

## Tecnologias Utilizadas

- **Frontend**: Next.js 14
- **Styling**: TailwindCSS + shadcn/ui
- **Animações**: Framer Motion
- **Auth**: Simulação de NextAuth.js (JWT na implementação real)
- **Banco de dados**: Implementação com localStorage (Firebase Firestore na implementação real)
- **Gráficos**: Recharts

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/furia-fan-hub.git
   cd furia-fan-hub
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) em seu navegador.

## Estrutura do Projeto

- `/src/app`: Páginas da aplicação (Next.js App Router)
  - `/auth`: Login e onboarding
  - `/dashboard`: Visão geral, analytics e recomendações
  - `/settings`: Configurações do usuário
- `/src/components`: Componentes reutilizáveis
  - `/layout`: Componentes de layout (Sidebar, Navbar)
  - `FanLevelBadge.tsx`: Badge de nível de fã
- `/public/icons`: Ícones e assets

## Fluxo da Aplicação

1. **Landing Page**: Hero + CTA → Detectar sessão → redirect /dashboard
2. **Login**: Botões OAuth → Simula login
3. **Onboarding**: 3 perguntas em modal → Salva em localStorage
4. **Dashboard**: Sidebar + Navbar → Carrega perfil e provê tabs

## Licença

Este projeto é privado e não está licenciado para uso público.
