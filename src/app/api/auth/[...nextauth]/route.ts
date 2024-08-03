import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { compare } from "bcrypt";
import prisma from "@/lib/db";

// const prisma = new PrismaClient();

type PrismaUser = {
    id: number;
    email: string;
    password: string;
    username: string;
}

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: "/signin",
    },
    secret: process.env.KEY,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user: PrismaUser | null = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && (await compare(credentials.password, user.password))) {
                    return { id: user.id.toString(), email: user.email , name: user.username };
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString();
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
        
            return {
                ...session,
                user : {
                    ...session,
                    email: token.email as string,
                    name: token.name as string,
                    id: token.id as string
                }
            };
        },
    },
};

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }
