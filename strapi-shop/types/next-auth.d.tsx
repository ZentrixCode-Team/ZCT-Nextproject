import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    strapiToken?: string;
    refreshToken?: string;
  }
  interface Session {
    error?: "RefreshTokenError";
    user: {
      id: string;
      strapiToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    strapiToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: "RefreshTokenError";
  }
}