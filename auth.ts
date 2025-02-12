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
          image: "/assets/placeholder.svg"  // Add this line
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
    async jwt({ token, user, account }) {
      console.log("JWT STARTED - Full token:", token);
      console.log("JWT STARTED - Full user object:", user);
      console.log("JWT STARTED - Account type:", account?.provider);
      
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
        console.log("JWT AFTER UPDATE - Token picture:", token.picture);
      }
      
      console.log("JWT FINAL - Full token being returned:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session email:", session.user?.email);
      console.log("Session image:", session.user?.image);
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});