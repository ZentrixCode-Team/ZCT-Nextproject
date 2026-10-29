import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { strapifetch, StrapiError } from "@/lib/strapi";

export async function callStrapi(path: string, options: RequestInit = {}) {
  const session = await auth();
    const token = session?.user?.strapiToken;
  if (!token || session?.error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await strapifetch<unknown>(path, token, {
      cache: "no-store",
      ...options,
    });
    return NextResponse.json(data);
  } catch (err) {
    const status = err instanceof StrapiError ? err.status : 502;
    return NextResponse.json({ error: "Request failed" }, { status });
  }
}