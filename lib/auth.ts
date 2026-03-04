import { NextAuthOptions } from "next-auth";
import prisma from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {comparePassword} from "@/lib/helper";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //check if user exist
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if(!user) {
          throw new Error("Invalid email or password");

        }

        // check if user's password is correct
        const isValidPassword = await comparePassword(password, user.password as string);

        if (!user || !isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token } ) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username
      }

      // this check for valid username and update the username on Username update
      if (token?.id && !token.username) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
        });

        if (dbUser) {
          token.username = dbUser.username;
        }
      }

      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.username = token.username
      }

      return session;
    },
  },
};
