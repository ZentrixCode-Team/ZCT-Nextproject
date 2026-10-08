import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/api";
import { getImageUrl } from "@/lib/image";

import ProductGallery from "@/app/components/ProductGallery";
import RichText from "@/app/components/RichText";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatPrice(
  price: string | number | null | undefined
) {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "Unavailable";
  }

  return numericPrice.toLocaleString("en-US");
}

function getDiscountPercentage(
  price: string | number | null | undefined,
  oldPrice: string | number | null | undefined
) {
  const current = Number(price);
  const old = Number(oldPrice);

  if (
    !Number.isFinite(current) ||
    !Number.isFinite(old) ||
    old <= current ||
    old <= 0
  ) {
    return null;
  }

  return Math.round(((old - current) / old) * 100);
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const discount = getDiscountPercentage(
    product.Price,
    product.OldPrice
  );

  const category = product.Category;

  const pictureUrl = getImageUrl(
    product.Picture?.url
  );

  return (
    <main className="min-h-screen bg-[#05070a] text-white">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">

        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">

          <Link
            href="/shop"
            className="transition-colors hover:text-cyan-400"
          >
            Shop
          </Link>

          <span>/</span>

          {category && (
            <>
              <Link
                href={`/category/${category.slug}`}
                className="transition-colors hover:text-cyan-400"
              >
                {category.name}
              </Link>

              <span>/</span>
            </>
          )}

          <span className="text-slate-500">
            {product.Title}
          </span>

        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">

          {/* Gallery */}
          <ProductGallery
            title={product.Title}
            picture={product.Picture}
            gallery={product.Gallery}
          />

          {/* Info */}
          <div className="lg:pt-4">

            {/* Badge */}
            {product.Badge && (
              <div className="mb-5">
                <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  {product.Badge}
                </span>
              </div>
            )}

            {/* Stock */}
            <div className="mb-5 flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full ${
                  product.InStock === false
                    ? "bg-red-400"
                    : "bg-emerald-400"
                }`}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                {product.InStock === false
                  ? "Out of stock"
                  : "In stock"}
              </span>

            </div>

            {/* Label */}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              NOVA Product
            </p>

            {/* Title */}
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {product.Title}
            </h1>

            {/* Short Description */}
            {product.ShortDescription && (
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                {product.ShortDescription}
              </p>
            )}

            {/* Price */}
            <div className="mt-8 border-y border-white/[0.07] py-6">

              <div className="flex flex-wrap items-end gap-4">

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {formatPrice(product.Price)}
                  </span>

                  <span className="text-xs font-medium text-slate-600">
                    Toman
                  </span>
                </div>

                {product.OldPrice !== null &&
                  product.OldPrice !== undefined &&
                  Number(product.OldPrice) >
                    Number(product.Price) && (
                    <span className="text-sm text-slate-600 line-through">
                      {formatPrice(product.OldPrice)}
                    </span>
                  )}

                {discount !== null && (
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-bold text-emerald-300">
                    {discount}% OFF
                  </span>
                )}

              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              disabled={product.InStock === false}
              className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-black transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
            >
              {product.InStock === false
                ? "Out of stock"
                : "Add to cart"}
            </button>

            {/* Product Details */}
            <div className="mt-8 rounded-3xl border border-white/[0.07] bg-[#0a0d11] p-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Product Details
              </p>

              <div className="mt-5 divide-y divide-white/[0.06]">

                {category && (
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xs text-slate-500">
                      Category
                    </span>

                    <Link
                      href={`/category/${category.slug}`}
                      className="text-xs font-semibold text-white transition-colors hover:text-cyan-400"
                    >
                      {category.name}
                    </Link>
                  </div>
                )}

                <div className="flex items-center justify-between py-4">
                  <span className="text-xs text-slate-500">
                    Availability
                  </span>

                  <span className="text-xs font-semibold text-white">
                    {product.InStock === false
                      ? "Unavailable"
                      : "Available"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-xs text-slate-500">
                    Warranty
                  </span>

                  <span className="text-xs font-semibold text-white">
                    NOVA Standard
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {product.Description && (
        <section className="border-t border-white/[0.06]">

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

            <div className="max-w-3xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                Description
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white">
                Built for better technology.
              </h2>

              <div className="mt-8">
                <RichText content={product.Description} />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Bottom Features */}
      <section className="border-t border-white/[0.06]">

        <div className="mx-auto grid max-w-7xl gap-px border-x border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">

          <div className="bg-[#05070a] p-8">
            <p className="text-sm font-bold text-white">
              Premium Quality
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Carefully selected technology designed for everyday use.
            </p>
          </div>

          <div className="bg-[#05070a] p-8">
            <p className="text-sm font-bold text-white">
              NOVA Support
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Reliable support whenever you need it.
            </p>
          </div>

          <div className="bg-[#05070a] p-8">
            <p className="text-sm font-bold text-white">
              Standard Warranty
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Every product is backed by NOVA standard warranty.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}