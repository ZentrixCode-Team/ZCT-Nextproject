import { NextResponse } from "next/server";
import { callStrapi } from "@/lib/strapi-route";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = await req.json().catch(() => null);
  if (!input?.message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  return callStrapi("/api/ticket-replies", {
    method: "POST",
    body: JSON.stringify({ data: { message: input.message, ticket: id } }),
  });
}