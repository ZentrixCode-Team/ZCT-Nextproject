import Link from "next/link";
import { strapifetch, StrapiError } from "@/lib/strapi";
import type { Ticket } from "@/lib/ticket-types";
import {
  getStrapiToken,
  StatusBadge,
  formatDate,
  SessionExpired,
} from "@/lib/tickets";

export default async function TicketsPage() {
  const token = await getStrapiToken();

  let tickets: Ticket[] = [];
  try {
    const res = await strapifetch<{ data: Ticket[] }>("/api/tickets", token, {
      cache: "no-store",
    });
    tickets = res.data;
  } catch (err) {
    if (err instanceof StrapiError && err.status === 401) {
      return (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <SessionExpired />
        </main>
      );
    }
    throw err;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My tickets</h1>
        <Link
          href="/dashboard/tickets/new"
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        >
          New ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          You have no tickets yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li key={t.documentId}>
              <Link
                href={`/dashboard/tickets/${t.documentId}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.title}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {formatDate(t.createdAt)} · {t.ticket_replies?.length ?? 0} replies
                  </p>
                </div>
                <StatusBadge status={t.ticketStatus} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}