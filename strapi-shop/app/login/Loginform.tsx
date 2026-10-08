"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Loginform() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#05070a] px-5 py-16 text-white">
      <div className="w-full max-w-md">

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-lg font-black text-cyan-400">
            N
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
            Welcome back
          </p>

          <h1 className="text-3xl font-black tracking-tight">
            Sign in to NOVA
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Access your account and continue your NOVA experience.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/30 sm:p-8"
        >
          <div className="space-y-5">

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-slate-400"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
              />
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-slate-400"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
              />
            </div>

            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3">
                <p className="text-xs leading-5 text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-white text-sm font-bold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {/* Register */}

          <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>

        {/* Back */}

        <Link
          href="/"
          className="mt-6 block text-center text-xs text-slate-600 transition hover:text-slate-400"
        >
          ← Back to NOVA
        </Link>
      </div>
    </main>
  );
}