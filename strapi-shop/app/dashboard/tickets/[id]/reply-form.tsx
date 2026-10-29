"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReplyForm({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;

    setError(null);
    setLoading(true);

    const res = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(
        res.status === 401
          ? "Your session has expired. Please log out and log in again."
          : "Could not send your reply. Please try again."
      );
      return;
    }

    setMessage("");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        maxLength={3000}
        placeholder="Write a reply..."
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send reply"}
      </button>
    </form>
  );
}