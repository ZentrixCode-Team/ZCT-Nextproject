import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userName =
    session.user?.name ||
    session.user?.email ||
    "NOVA User";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#05070a] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            NOVA Account
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Welcome back, {userName}.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your account and explore everything NOVA has to offer.
          </p>
        </div>

        {/* Account Card */}

        <section className="mb-6 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                Account
              </p>

              <h2 className="mt-2 text-lg font-bold text-white">
                Account Information
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-sm font-black text-cyan-400">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                Name
              </p>

              <p className="truncate text-sm font-medium text-slate-200">
                {session.user?.name || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                Email
              </p>

              <p className="truncate text-sm font-medium text-slate-200">
                {session.user?.email || "Not available"}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            href="/shop"
            className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
          >
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8h12l1 12H5L6 8Z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>
            </div>

            <h3 className="text-sm font-bold text-white">
              Explore Shop
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Browse the latest products from NOVA.
            </p>

            <span className="mt-5 block text-xs font-semibold text-cyan-400 transition group-hover:text-cyan-300">
              View products →
            </span>
          </Link>

          <Link
            href="/"
            className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.04]"
          >
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] text-blue-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 11 9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>
            </div>

            <h3 className="text-sm font-bold text-white">
              Back to Home
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Return to the NOVA homepage.
            </p>

            <span className="mt-5 block text-xs font-semibold text-blue-400 transition group-hover:text-blue-300">
              Go home →
            </span>
          </Link>

          <Link
            href="/about"
            className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all hover:-translate-y-0.5 hover:border-purple-400/20 hover:bg-white/[0.04]"
          >
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/10 bg-purple-400/[0.06] text-purple-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5" />
                <path d="M12 8h.01" />
              </svg>
            </div>

            <h3 className="text-sm font-bold text-white">
              About NOVA
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Learn more about NOVA and what we build.
            </p>

            <span className="mt-5 block text-xs font-semibold text-purple-400 transition group-hover:text-purple-300">
              Learn more →
            </span>
          </Link>

        </section>
      </div>
    </main>
  );
}