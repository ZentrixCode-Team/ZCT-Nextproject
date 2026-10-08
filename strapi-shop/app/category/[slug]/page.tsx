import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategory,
  getProductsByCategory,
} from "@/lib/api";

import ProductCard from "@/app/components/ProductCard";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const [{ data: category }, { data: products }] =
    await Promise.all([
      getCategory(slug),
      getProductsByCategory(slug),
    ]);

  if (!category) {
    notFound();
  }

  return (
    <main>
      {/* =========================
          HEADER
      ========================= */}

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <Link
            href="/shop"
            className="text-xs font-medium text-slate-600 transition-colors hover:text-white"
          >
            ← Back to shop
          </Link>

          <div className="mt-12 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
              NOVA Category
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCTS
      ========================= */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}
          </p>

          <Link
            href="/shop"
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            All products
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/[0.07] bg-[#090c10]">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] font-black text-cyan-400">
                N
              </div>

              <h2 className="mt-5 text-lg font-bold text-white">
                No products yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                There are no products in this
                category yet.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-slate-200"
              >
                Browse all products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={
                  product.documentId ||
                  product.id
                }
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}