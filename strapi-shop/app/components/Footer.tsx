import Link from "next/link";
import { getSiteSettings } from "@/lib/api";

export default async function Footer() {
  const settings = await getSiteSettings();

  if (!settings?.data) {
    return null;
  }

  const {
    siteName,
    siteDescription,
    footerColumns,
    copyright,
  } = settings.data;

  return (
    <footer className="border-t border-white/[0.06] bg-[#030507]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5">
                <span className="text-sm font-black text-cyan-400">
                  N
                </span>
              </div>

              <span className="text-sm font-black tracking-[0.18em] text-white">
                {siteName || "NOVA"}
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
              {siteDescription ||
                "Technology designed around the way you live, work and create."}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Built for everyday life
              </span>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns?.map((column) => (
              <div key={column.id}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                  {column.title}
                </h3>

                {column.links?.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => {
                      const isExternal =
                        link.url.startsWith("http://") ||
                        link.url.startsWith("https://");

                      if (isExternal || link.openNewTab) {
                        return (
                          <li key={link.id}>
                            <a
                              href={link.url}
                              target={
                                link.openNewTab
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                link.openNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-sm text-slate-500 transition-colors hover:text-white"
                            >
                              {link.label}
                            </a>
                          </li>
                        );
                      }

                      return (
                        <li key={link.id}>
                          <Link
                            href={link.url}
                            className="text-sm text-slate-500 transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            {copyright || "© 2026 NOVA. All rights reserved."}
          </p>

          <p className="text-xs text-slate-600">
            Simple. Useful. Better.
          </p>
        </div>
      </div>
    </footer>
  );
}