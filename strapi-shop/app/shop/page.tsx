import { getProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";

export default async function ShopPage() {
  const { data: products } = await getProducts();

  return (
    <div>
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
            NOVA Store
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-[-0.03em] text-white sm:text-6xl">
            Explore products.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            A curated collection of technology and
            accessories designed to make everyday life
            better.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}
          </p>

          <button className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-400">
            All products
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/[0.07] bg-[#090c10]">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] font-black text-cyan-400">
                N
              </div>

              <h2 className="mt-5 text-lg font-bold text-white">
                Products coming soon
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                We are preparing something great.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.documentId || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}