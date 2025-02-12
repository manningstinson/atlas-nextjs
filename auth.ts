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
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
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
    async session({ session, token }) {
      // Ensure the session includes the user's ID
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Add user ID to the token when a user is created or logged in
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});