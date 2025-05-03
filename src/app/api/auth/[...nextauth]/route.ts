import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0"
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      // Adiciona informações do provedor à sessão
      if (token) {
        session.user.id = token.sub;
        session.user.provider = token.provider;
      }
      return session;
    },
    async jwt({ token, account }) {
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