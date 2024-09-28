
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers:
    [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token as { id: string }).id;
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
