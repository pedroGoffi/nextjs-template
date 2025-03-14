import { prisma } from "@/utils/prisma/prisma";
import { User } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


// 🔹 Tipagem do JWT (adicionando o `id`)
declare module "next-auth/jwt" {
    interface JWT {
      id: string;
    }
  }
  
  // 🔹 Tipagem da Session (adicionando `id` ao user)
  declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
      };
    }
  }
  
interface Credentials {
  email: string;
  password: string;
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials?: Credentials) {
        if (!credentials) return null;

        // Busca usuário no banco
        const foundUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!foundUser || !foundUser.password) return null;

        // Compara a senha com hash
        const passwordMatch = await bcrypt.compare(credentials.password, foundUser.password);
        if (!passwordMatch) return null;

        // Retorna dados sem expor a senha
        return { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const auth = NextAuth(authConfig);
