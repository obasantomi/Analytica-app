import { prisma } from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },

  providers: [
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

        if (!user) return null;

        const valid = await compare(credentials.password, user.password || "");
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          level: user.level,
          username: user.username || undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.level = user.level;
        token.username = user.username || undefined;
        token.fullName = user.fullName!;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.level = token.level;
      session.user.username = token.username || undefined;
      session.user.fullName = token.fullName!;
      return session;
    },
  },
};

export default authOptions;
