export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF", // The turquoise color from the image
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    // Credentials provider first
    Credentials({
      credentials: {
        email: { 
          label: "Email",
          type: "email",
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
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
    // GitHub provider second
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
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account }) {
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