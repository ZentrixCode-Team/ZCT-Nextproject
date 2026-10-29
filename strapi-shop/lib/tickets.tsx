import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Ticket } from "@/lib/ticket-types";

export async function getStrapiToken() {
  const session = await auth();
  if (!session?.user?.strapiToken || session.error) redirect("/login");
  return session.user.strapiToken;
}
const STATUS_STYLES: Record<Ticket["ticketStatus"], string> = {
  open: "bg-emerald-500/15 text-emerald-300",
  in_progress: "bg-amber-500/15 text-amber-300",
  closed: "bg-white/10 text-white/60",
};

const STATUS_LABELS: Record<Ticket["ticketStatus"], string> = {
  open: "Open",
  in_progress: "In progress",
  closed: "Closed",
};

export function StatusBadge({ status }: { status: Ticket["ticketStatus"] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function SessionExpired() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="font-medium">Your session has expired.</p>
      <p className="mt-1 text-sm text-white/60">
        Please log out and log in again to continue.
      </p>
      <Link href="/login" className="mt-4 inline-block text-sm underline">
        Go to login
      </Link>
    </div>
  );
}