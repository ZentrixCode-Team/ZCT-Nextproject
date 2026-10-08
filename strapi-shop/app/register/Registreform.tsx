"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registerform() {
  const router = useRouter();

  const [username, setUsername] = useState("");
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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!loginResult || loginResult.error) {
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#05070a] px-5 py-16 text-white">
      <div className="w-full max-w-md">

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] text-lg font-black text-blue-400">
            N
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            Get started
          </p>

          <h1 className="text-3xl font-black tracking-tight">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Join NOVA and get access to your personal account.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/30 sm:p-8"
        >
          <div className="space-y-5">

            {/* Username */}

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-semibold text-slate-400"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                autoComplete="username"
                required
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-400/[0.02]"
              />
            </div>

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
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-400/[0.02]"
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
                placeholder="Create a password"
                autoComplete="new-password"
                required
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-400/[0.02]"
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          {/* Login */}

          <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Sign in
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