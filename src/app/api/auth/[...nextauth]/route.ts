import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Access",
      credentials: {
        password: { label: "Master Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if the entered password matches your .env password
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          // Return a dummy user object to tell NextAuth the login was successful
          return { id: "1", name: "Admin", email: "admin@tubagusdafa.com" };
        }
        // If wrong, reject the login
        return null;
      }
    })
  ],
  pages: {
    // We will tell NextAuth to use a custom login page that matches your theme!
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };