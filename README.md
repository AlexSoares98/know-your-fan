# FURIA Know Your Fan

Uma plataforma para entender, segmentar e engajar fãs da FURIA a partir dos seus dados sociais, documentos e interações. O projeto visa criar uma experiência personalizada para os fãs de e-sports, permitindo que a organização entenda melhor seu público.

## Funcionalidades Principais

1. **Login Social**
   - Login com Twitter, Google ou Discord 
   - Sistema preparado para autenticação OAuth 

2. **Coleta de Dados**
   - Formulário completo para dados pessoais (nome, endereço e CPF)
   - Registro de interesses, eventos e compras 
   - Validação de documentos com análise por IA

3. **Integração com Redes Sociais**
   - Vinculação de múltiplas redes sociais ao perfil do usuário
   - Análise de interações, páginas seguidas e atividades relacionadas a e-sports
   - Classificação de perfil com base no engajamento

4. **Verificação de Perfis de E-Sports**
   - Compartilhamento de links para perfis em plataformas de e-sports
   - Validação de relevância de conteúdo usando IA
   - Pontuação baseada na atividade em jogos competitivos

5. **Onboarding Personalizado**
   - Perguntas para registrar preferências (jogador favorito, frequência, tipo de conteúdo) 

6. **Dashboard Completo**
   - **Visão Geral**: Perfil do fã, próximas partidas, status ao vivo
   - **Analytics**: Heatmap de engajamento, análise de sentimento
   - **Recomendações**: Cards de ação personalizados

7. **Level Badges**
   - Exibe um selo (Casual, Leal ou Furioso) baseado no engajamento e histórico de compras (Gameficação)

8. **Configurações**
   - Alternar tema Claro ou escuro 
   - Exportar seus dados  
   - Excluir conta 

## Simulações de IA e Implementação Real

O projeto atual utiliza simulações para demonstrar as funcionalidades de IA, mas poderia ser implementado com serviços reais conforme detalhado abaixo:

### 1. Validação de Documentos
**Simulação atual:**
- Upload de documentos com verificação simulada via setTimeout
- Feedback visual do processo de validação

**Implementação real possível:**
- **AWS Rekognition**: Para detectar e validar documentos oficiais 
- **Google Cloud Vision**: Extração de texto e validação de documentos
- **Microsoft Azure Document Intelligence**: Para verificação avançada de IDs
- **Onfido/Jumio**: Serviços completos de verificação KYC  

### 2. Análise de Redes Sociais
**Simulação atual:**
- Conexão simulada com redes sociais
- Dados gerados aleatoriamente para interações

**Implementação real possível:**
- **Twitter API v2**: Para análise de tweets e interações
- **Facebook Graph API**: Requer aprovação de app para acesso a dados de usuário
- **Google Natural Language API**: Análise de sentimento de conteúdo 
- **Serviços de Social Listening**: Brandwatch ou Sprinklr para análise avançada

### 3. Validação de Perfis de E-Sports
**Simulação atual:**
- URLs de perfil com validação simulada
- Pontuação de relevância gerada aleatoriamente

**Implementação real possível:**
- **FACEIT API**: Dados reais de jogadores 
- **ESEA API**: Estatísticas e perfil de jogadores
- **Steam Web API**: Para verificar jogos e histórico de partidas
- **Web scraping com Puppeteer**: Para plataformas sem API pública

## Tecnologias Utilizadas

- **Frontend**: Next.js 14
- **Styling**: TailwindCSS
- **Animações**: Framer Motion
- **UI Components**: Componentes customizados
- **Auth**: Simulação de OAuth (NextAuth.js na implementação real)
- **Armazenamento**: localStorage (Firebase/MongoDB na implementação real)
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
  - `/auth`: Login, registro e onboarding
  - `/dashboard`: Visão geral, analytics e recomendações
  - `/settings`: Configurações do usuário
- `/src/components`: Componentes reutilizáveis
  - `/UserDataForm.tsx`: Formulário de dados do usuário
  - `/DocumentUpload.tsx`: Componente de upload de documentos
  - `/SocialMediaConnect.tsx`: Conexão com redes sociais
  - `/ESportsProfileLinks.tsx`: Validação de perfis de e-sports
  - `/layout`: Componentes de layout (Sidebar, Navbar)
  - `FanLevelBadge.tsx`: Badge de nível de fã

## Fluxo da Aplicação

1. **Landing Page**: Apresentação + Botões de login/registro
2. **Registro**:
   - Formulário de dados pessoais
   - Upload e validação de documentos
   - Conexão com redes sociais
   - Vinculação de perfis de e-sports
3. **Login**: Autenticação social ou com credenciais
4. **Onboarding**: Preferências de conteúdo e jogadores
5. **Dashboard**: Experiência personalizada com base nos dados coletados

## Considerações de Implementação

- Para um produto final, seria necessário implementar medidas de segurança e privacidade robustas
- A integração real com APIs externas requer monitoramento de limites e quotas
- Os serviços de IA geralmente têm custos baseados em volume, então é importante planejar a escalabilidade
- O consentimento do usuário e a conformidade com a LGPD são essenciais para o uso de dados pessoais

## Licença

Este projeto é para uso educacional e demonstrativo, não estando licenciado para uso público comercial sem autorização.
