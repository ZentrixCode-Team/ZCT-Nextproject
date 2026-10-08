import Link from "next/link";

import { auth } from "@/auth";
import { getSiteSettings } from "@/lib/api";
import { getImageUrl } from "@/lib/image";

import Logoutbutton from "./Logoutbutton";

export default async function Navbar() {
  const [settings, session] = await Promise.all([
    getSiteSettings(),
    auth(),
  ]);

  if (!settings?.data) {
    return null;
  }

  const site = settings.data;

  const navbarLinks = site.navbarLinks ?? [];

  const logoUrl = getImageUrl(site.logo?.url);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* =========================
            LOGO
        ========================= */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          {logoUrl ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <img
                src={logoUrl}
                alt={
                  site.logo?.alternativeText ||
                  site.siteName ||
                  "NOVA"
                }
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-black text-cyan-400 transition-colors group-hover:border-cyan-400/20">
              N
            </div>
          )}

          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-white">
              {site.siteName || "NOVA"}
            </p>

            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Technology, Designed Better.
            </p>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAV
        ========================= */}

        <nav className="hidden items-center gap-8 md:flex">
          {navbarLinks.map((link) => {
            const linkClass =
              "text-xs font-medium text-slate-500 transition-colors hover:text-white";

            if (link.openNewTab) {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.id}
                href={link.url}
                className={linkClass}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="flex items-center gap-2">

          {/* Search */}

          <Link
            href="/shop"
            aria-label="Search products"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-slate-500 transition-all hover:border-white/10 hover:text-white sm:flex"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />
              <path d="m20 20-4-4" />
            </svg>
          </Link>

          {/* =========================
              AUTH
          ========================= */}

          {session ? (
            <div className="hidden items-center gap-2 sm:flex">

              <Link
                href="/dashboard"
                className="rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-slate-400 transition-all hover:border-cyan-400/20 hover:text-white"
              >
                Dashboard
              </Link>

              <span className="max-w-32 truncate px-2 text-xs font-medium text-slate-500">
                {session.user?.name ||
                  session.user?.email ||
                  "Account"}
              </span>

              <Logoutbutton />
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">

              <Link
                href="/login"
                className="rounded-full px-4 py-2.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-slate-200"
              >
                Register
              </Link>
            </div>
          )}

          {/* =========================
              SHOP
          ========================= */}

          <Link
            href="/shop"
            className="hidden rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-slate-200 md:block"
          >
            Shop
          </Link>

          {/* =========================
              MOBILE MENU
          ========================= */}

          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-slate-400 transition-colors hover:text-white">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </summary>

            <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090c10] p-2 shadow-2xl shadow-black/40">

              <Link
                href="/"
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                Home
              </Link>

              {navbarLinks.map((link) => {
                if (link.openNewTab) {
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="block rounded-xl px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="my-2 h-px bg-white/[0.06]" />

              <Link
                href="/shop"
                className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-black"
              >
                Shop
              </Link>

              <div className="my-2 h-px bg-white/[0.06]" />

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                    <span className="max-w-36 truncate text-xs text-slate-500">
                      {session.user?.name ||
                        session.user?.email ||
                        "Account"}
                    </span>

                    <Logoutbutton />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-xl px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="block rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}