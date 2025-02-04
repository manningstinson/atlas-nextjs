import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const fetchUser = async (email: string) => {
  const result = await pool.query(
    'SELECT id, email, password FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
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
        email: {
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      //@ts-ignore
      authorize: async (credentials: { email: string; password: string }) => {
        const { email, password } = credentials;
        const user = await fetchUser(email);
        if (!user) return null;
        //@ts-ignore
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});