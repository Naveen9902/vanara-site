import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'OTP',
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;
        
        const email = credentials.email.toLowerCase();
        
        const tokenRecord = await prisma.verificationToken.findFirst({
          where: { identifier: email, token: credentials.otp }
        });

        if (!tokenRecord) {
          throw new Error("Invalid code");
        }

        if (tokenRecord.expires < new Date()) {
          throw new Error("Code expired");
        }

        // Token is valid! Delete it so it can't be reused
        await prisma.verificationToken.delete({
          where: { token: credentials.otp }
        });

        // Find or create the user
        let user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          user = await prisma.user.create({
            data: { email }
          });
        }

        return user;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
}

export const auth = () => getServerSession(authOptions)
