import Link from "next/link";
import { notFound } from "next/navigation";
import { strapifetch, StrapiError } from "@/lib/strapi";
import type { Ticket } from "@/lib/ticket-types";
import {
  getStrapiToken,
  StatusBadge,
  formatDate,
  SessionExpired,
} from "@/lib/tickets";
import ReplyForm from "./reply-form";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getStrapiToken();

  let ticket: Ticket;
  try {
    const res = await strapifetch<{ data: Ticket }>(
      `/api/tickets/${encodeURIComponent(id)}`,
      token,
      { cache: "no-store" }
    );
    ticket = res.data;
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) notFound();
    if (err instanceof StrapiError && err.status === 401) {
      return (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <SessionExpired />
        </main>
      );
    }
    throw err;
  }

  const replies = [...(ticket.ticket_replies ?? [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard/tickets" className="text-sm text-white/60 hover:text-white">
        ← Back to tickets
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">{ticket.title}</h1>
        <StatusBadge status={ticket.ticketStatus} />
      </div>
      <p className="mt-1 text-xs text-white/50">{formatDate(ticket.createdAt)}</p>

      <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-4">
        {ticket.message}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-medium">Conversation</h2>

      {replies.length === 0 ? (
        <p className="text-sm text-white/50">No replies yet.</p>
      ) : (
        <ul className="space-y-3">
          {replies.map((r) => (
            <li
              key={r.documentId}
              className={`rounded-2xl p-4 ${
                r.isFromSupport
                  ? "border border-sky-400/20 bg-sky-500/10"
                  : "border border-white/10 bg-white/5"
              }`}
            >
              <p className="mb-1 text-xs text-white/50">
                {r.isFromSupport ? "Support" : "You"} · {formatDate(r.createdAt)}
              </p>
              <p className="whitespace-pre-wrap">{r.message}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        {ticket.ticketStatus === "closed" ? (
          <p className="text-sm text-white/50">This ticket is closed.</p>
        ) : (
          <ReplyForm ticketId={ticket.documentId} />
        )}
      </div>
    </main>
  );
}