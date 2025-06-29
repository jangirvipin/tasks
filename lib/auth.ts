import type { NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/db";

interface ExtendedProfile extends Profile {
    sub: string;
    email?: string;
    picture?: string;
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            profile(profile: ExtendedProfile) {
                return {
                    id: profile.sub,
                    email: profile.email,
                    name: profile.name,
                };
            },
        }),
    ],

    pages: {
        signIn: "/signin",
    },

    callbacks: {
        async signIn({ profile }) {
            const googleProfile = profile as ExtendedProfile;
            if (!googleProfile || !googleProfile.email) {
                return false;
            }

            const email = googleProfile.email;
            console.log('sign in with email', email);
            const userExists = await prisma.user.findUnique({
                where: { email },
            });

            if (userExists) {
                return true;
            } else {
                await prisma.user.create({
                    data: {
                        email: googleProfile.email,
                        name: googleProfile.name,
                    },
                });
                return true;
            }
        },
        async session({ session, token, user }) {

            if (session.user) {
                session.user.email = token.email as string;
            }
            return session;
        },

        async jwt({ token, user }) {
            // token with email
            if (user) {
                token.email = user.email;
            }
            return token;
        },

        async redirect() {
            return "/vendor";
        },
    },
};
