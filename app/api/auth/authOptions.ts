import { prisma } from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.username || user.name || undefined,
          level: user.level,
          username: user.username ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // `user` is only available on first sign-in
      if (user) {
        token.id = user.id;
        token.level = user.level;
        token.username = user.username as string | undefined;
        token.email = user.email || undefined;
        token.image = user.image || undefined;
      }

      // For Google, fetch fresh data from DB on first sign-in
      if (account?.provider === "google" && user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.level = dbUser.level;
          token.username = dbUser.username || dbUser.name || undefined;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.level = token.level;
      session.user.username = token.username as string | undefined;
      session.user.email = token.email as string;
      session.user.image = token.image as string | undefined;
      return session;
    },
  },
};

export default authOptions;
