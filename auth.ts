import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcryptjs from 'bcryptjs'; // Using bcryptjs instead of bcrypt

// Mock function to fetch user by email
const fetchUser = async (email: string) => {
  // Replace this with your actual user fetching logic
  return { email, password: "hashed_password" };
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
        try {
          const { email, password } = credentials;
          const user = await fetchUser(email);
          
          if (!user) return null;
          
          // Using bcryptjs compare instead of bcrypt
          const passwordsMatch = await bcryptjs.compare(password, user.password);
          
          if (passwordsMatch) return user;
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});