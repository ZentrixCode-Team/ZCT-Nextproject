import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";

// زمان انقضا (میلی‌ثانیه) رو از خود JWT می‌خونه
function getExpiry(jwt: string): number {
  try {
    const payload = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" ? exp * 1000 : 0;
  } catch {
    return 0;
  }
}

async function refreshStrapiToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!res.ok) throw new Error(`refresh failed with status ${res.status}`);

    const data = await res.json();
    if (typeof data.jwt !== "string") throw new Error("no jwt in refresh response");

    return {
      ...token,
      strapiToken: data.jwt,
      // با هر رفرش، توکن قبلی باطل و یه توکن جدید برگردونده می‌شه
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: getExpiry(data.jwt),
      error: undefined,
    };
  } catch (error) {
    console.error("Strapi token refresh failed:", error);
    return { ...token, error: "RefreshTokenError" };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        try {
          const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.log("خطای ورود از سمت Strapi:", data);
            return null;
          }

          return {
            id: String(data.user.id),
            name: data.user.username,
            email: data.user.email,
            strapiToken: data.jwt,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error("خطای شبکه یا سرور:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // لحظه‌ی لاگین
      if (user) {
        return {
          ...token,
          id: user.id as string,
          email: user.email,
          strapiToken: user.strapiToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: getExpiry(user.strapiToken ?? ""),
          error: undefined,
        };
      }

      // قبلاً رفرش شکست خورده: کاربر باید دوباره لاگین کنه
      if (token.error) return token;

      // توکن هنوز معتبره (۳۰ ثانیه حاشیه‌ی امن)
      if (Date.now() < (token.accessTokenExpires ?? 0) - 30_000) return token;

      // توکن منقضی شده: رفرش
      if (!token.refreshToken) return { ...token, error: "RefreshTokenError" };
      return refreshStrapiToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.strapiToken = token.strapiToken as string;
      session.user.email = token.email as string;
      session.error = token.error;
      return session;
    },
  },
});