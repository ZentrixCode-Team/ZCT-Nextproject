import { callStrapi } from "@/lib/strapi-route";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return callStrapi(`/api/tickets/${encodeURIComponent(id)}`);
}