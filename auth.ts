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
  console.log("Email found in database:", rows[0]?.email);
  return rows[0];
};

export const { handlers, signIn, signOut, auth } = NextAuth({
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
      authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
        const { email, password } = credentials as { email: string; password: string };
        const user = await fetchUser(email);
        console.log("Credentials email:", email);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return {
          id: user.id,
          email: user.email,
          name: email.split('@')[0],
          image: "/placeholder.svg"
        };
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      },
      profile(profile) {
        console.log("GitHub email:", profile.email);
        console.log("GitHub avatar:", profile.avatar_url);
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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
        token.name = user.name;
      }
      console.log("JWT token after processing:", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.image = token.picture as string;
      session.user.name = token.name as string;
      console.log("Final session data:", session);
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});