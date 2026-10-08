import Link from "next/link";
import {
  getCategories,
  getProducts,
  getSiteSettings,
} from "@/lib/api";
import ProductCard from "./components/ProductCard";

export default async function HomePage() {
  const [
    { data: products },
    { data: categories },
    settings,
  ] = await Promise.all([
    getProducts(),
    getCategories(),
    getSiteSettings(),
  ]);

  const siteName =
    settings?.data?.siteName || "NOVA";

  const featuredProducts = products
    .filter((product) => product.Featured)
    .slice(0, 4);

  const categoryIcons: Record<string, string> = {
    headphones: "◉",
    keyboards: "⌨",
    mice: "◌",
    accessories: "◇",
    "desk-setup": "▣",
  };

  return (
    <main>
      {/* =========================
          HERO
      ========================= */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.08),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              {siteName}
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
              Technology,
              <br />
              designed better.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Thoughtfully designed technology and
              accessories for people who care about
              how their everyday tools look, feel, and
              perform.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-black transition hover:bg-slate-200"
              >
                Shop products →
              </Link>

              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-7 text-sm font-bold text-white transition hover:bg-white/[0.05]"
              >
                About NOVA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          INTRO
      ========================= */}

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                What we do
              </p>
            </div>

            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-5xl">
                Better tools for everyday life.
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                NOVA brings together technology,
                functionality, and thoughtful design to
                create products that fit naturally into
                modern life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                Categories
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                Find your setup.
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden text-xs font-bold text-slate-500 transition-colors hover:text-white sm:block"
            >
              View all →
            </Link>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={
                    category.documentId ||
                    category.id
                  }
                  href={`/category/${category.slug}`}
                  className="group"
                >
                  <article className="relative min-h-[190px] overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090c10] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#0c1015]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm text-cyan-400">
                      {categoryIcons[category.slug] ||
                        "◇"}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-lg font-bold text-white">
                        {category.name}
                      </h3>

                      {category.description && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                          {category.description}
                        </p>
                      )}

                      <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 transition-colors group-hover:text-cyan-400">
                        Explore →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/[0.07] bg-[#090c10] px-6 py-16 text-center">
              <p className="text-sm text-slate-500">
                Categories coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          FEATURED PRODUCTS
      ========================= */}

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                Featured
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                Selected for you.
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden text-xs font-bold text-slate-500 transition-colors hover:text-white sm:block"
            >
              Shop all →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={
                    product.documentId ||
                    product.id
                  }
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/[0.07] bg-[#090c10] px-6 py-16 text-center">
              <p className="text-sm text-slate-500">
                Featured products coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          WHY NOVA
      ========================= */}

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
              Why NOVA
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Simple by design.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Quality",
                text: "Products selected with attention to materials, performance, and reliability.",
              },
              {
                title: "Simplicity",
                text: "Technology without unnecessary complexity or clutter.",
              },
              {
                title: "Design",
                text: "Clean aesthetics designed to feel natural in modern spaces.",
              },
              {
                title: "Experience",
                text: "Every interaction should feel intentional, useful, and refined.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#090c10] p-7"
              >
                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
            NOVA
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">
            Upgrade the way you use technology.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500">
            Discover thoughtfully designed products
            made for everyday life.
          </p>

          <Link
            href="/shop"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition hover:bg-slate-200"
          >
            Explore NOVA →
          </Link>
        </div>
      </section>
    </main>
  );
}