import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const response = await fetch(
          `${process.env.STRAPI_URL}/api/auth/local`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        return {
          id: String(data.user.id),
          name: data.user.username,
          email: data.user.email,
          strapiToken: data.jwt,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.strapiToken = user.strapiToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.strapiToken = token.strapiToken as string;
      session.user.email = token.email as string;

      return session;
    },
  },
});