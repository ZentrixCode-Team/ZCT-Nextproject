"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.message === "strapi-token-expired") {
      signOut({
        callbackUrl: "/login",
      });
    }
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#05070a] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8 text-center shadow-2xl shadow-black/20">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.05] text-red-400">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <h1 className="mt-6 text-xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          We couldn't load your dashboard. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-full bg-white px-6 py-3 text-xs font-bold text-black transition hover:bg-slate-200"
        >
          Try again
        </button>

      </div>
    </main>
  );
}