import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';

const fetchUser = async (email: string) => {
  const { rows } = await sql`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
  `;
  console.log("Database user data:", rows[0]); // Log fetched user data
  return rows[0];
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await fetchUser(email);
        console.log("Credentials authorize - user data:", user); // Log user data in authorize

        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          const authorizedUser = {
            id: user.id,
            email: user.email,
            name: user.email.split('@')[0],
            image: "/assets/placeholder.svg"
          };
          console.log("Credentials authorize - returning user:", authorizedUser); // Log authorized user data
          return authorizedUser;
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      },
      profile(profile) {
        console.log("GitHub profile data:", profile); // Log GitHub profile data
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT Callback - Initial token:", token); // Log initial token
      console.log("JWT Callback - User data:", user); // Log user data
      console.log("JWT Callback - Account:", account); // Log account data

      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.name = user.name;
        token.email = user.email;
      }

      console.log("JWT Callback - Final token:", token); // Log final token
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Initial session:", session); // Log initial session
      console.log("Session Callback - Token:", token); // Log token

      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.picture as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      console.log("Session Callback - Final session:", session); // Log final session
      return session;
    },
    async authorized({ auth }) {
      console.log("Authorized Callback - Auth:", auth); // Log auth data
      return !!auth;
    },
  },
});