import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import { JWT } from "next-auth/jwt";

// Tipos
interface SessionCallbackParams {
  session: Session;
  token: JWT & { provider?: string };
}

interface JWTCallbackParams {
  token: JWT & { provider?: string };
  account: { provider: string } | null;
}

// Configuração dos provedores de autenticação
const providers = [];

// Adiciona Google Provider se as credenciais estiverem disponíveis
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Adiciona Discord Provider se as credenciais estiverem disponíveis
if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
  providers.push(
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  );
}

// Adiciona Twitter Provider se as credenciais estiverem disponíveis
if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })
  );
}

export const authOptions = {
  providers,
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }: SessionCallbackParams) {
      // Adiciona informações do provedor à sessão
      if (token && session.user) {
        // @ts-expect-error - Adicionando propriedades personalizadas à sessão do usuário
        session.user.id = token.sub;
        // @ts-expect-error - Adicionando propriedades personalizadas à sessão do usuário
        session.user.provider = token.provider;
      }
      return session;
    },
    async jwt({ token, account }: JWTCallbackParams) {
      // Guarda informações do provedor no token
      if (account) {
        token.provider = account.provider;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 