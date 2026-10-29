"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTicketPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    setLoading(true);

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        message: form.get("message"),
        priority: form.get("priority"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(
        res.status === 401
          ? "Your session has expired. Please log out and log in again."
          : "Could not create the ticket. Please try again."
      );
      return;
    }

    const body = await res.json();
    router.push(`/dashboard/tickets/${body.data.documentId}`);
    router.refresh();
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">New ticket</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm text-white/70">
            Title
          </label>
          <input id="title" name="title" required maxLength={150} className={field} />
        </div>

        <div>
          <label htmlFor="priority" className="mb-1 block text-sm text-white/70">
            Priority
          </label>
          <select id="priority" name="priority" defaultValue="medium" className={field}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm text-white/70">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={3000}
            className={field}
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit ticket"}
        </button>
      </form>
    </main>
  );
}