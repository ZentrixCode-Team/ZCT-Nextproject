import Link from "next/link";
import { auth } from "@/auth";
import { strapifetch } from "@/lib/strapi";
import type { Ticket } from "@/lib/ticket-types";
import { StatusBadge, formatDate } from "@/lib/tickets";

export default async function DashboardTickets() {
  const session = await auth();
  const token = session?.user?.strapiToken;

  let tickets: Ticket[] = [];
  let failed = false;

  if (token) {
    try {
      const res = await strapifetch<{ data: Ticket[] }>("/api/tickets", token, {
        cache: "no-store",
      });
      tickets = res.data;
    } catch {
      failed = true;
    }
  } else {
    failed = true;
  }

  const openCount = tickets.filter((t) => t.ticketStatus !== "closed").length;
  const recent = tickets.slice(0, 3);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Support tickets</h2>
          <p className="mt-1 text-sm text-white/50">
            {failed
              ? "Tickets are unavailable right now."
              : `${openCount} open · ${tickets.length} total`}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/tickets"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            View all
          </Link>
          <Link
            href="/dashboard/tickets/new"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
          >
            New ticket
          </Link>
        </div>
      </div>

      {failed ? (
        <p className="mt-6 text-sm text-white/60">
          If this keeps happening, log out and log in again.
        </p>
      ) : recent.length === 0 ? (
        <p className="mt-6 text-sm text-white/60">
          You have no tickets yet. Need help? Open a new ticket.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {recent.map((t) => (
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
    </section>
  );
}