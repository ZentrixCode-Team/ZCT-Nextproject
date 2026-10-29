import { NextResponse } from "next/server";
import { callStrapi } from "@/lib/strapi-route";

export async function GET() {
  return callStrapi("/api/tickets");
}

export async function POST(req: Request) {
  const input = await req.json().catch(() => null);
  if (!input?.title || !input?.message) {
    return NextResponse.json(
      { error: "title and message are required" },
      { status: 400 }
    );
  }

  return callStrapi("/api/tickets", {
    method: "POST",
    body: JSON.stringify({
      data: {
        title: input.title,
        message: input.message,
        priority: input.priority,
      },
    }),
  });
}