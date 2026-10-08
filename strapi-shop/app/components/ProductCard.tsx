import Image from "next/image";
import Link from "next/link";

import { getImageUrl } from "@/lib/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
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

export default function ProductCard({
  product,
}: ProductCardProps) {
  const imageUrl = getImageUrl(product.Picture?.url);

  const productUrl = product.slug
    ? `/product/${product.slug}`
    : "#";

  const hasOldPrice =
    product.OldPrice !== null &&
    product.OldPrice !== undefined &&
    Number(product.OldPrice) > Number(product.Price);

  return (
    <Link
      href={productUrl}
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0d11] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#0c1015]">

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#07090c]">

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                product.Picture?.alternativeText ||
                product.Title ||
                "Product"
              }
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl font-black text-cyan-400/70">
                N
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          {product.Badge && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {product.Badge}
              </span>
            </div>
          )}

          {/* Stock */}
          {product.InStock === false && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-red-300 backdrop-blur-md">
                Out of stock
              </span>
            </div>
          )}

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            →
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">

          <div className="flex-1">

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              NOVA Product
            </p>

            <h2 className="mt-2 text-lg font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-cyan-50">
              {product.Title}
            </h2>

            {product.ShortDescription && (
              <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                {product.ShortDescription}
              </p>
            )}

          </div>

          {/* Price */}
          <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4">

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-white">
                  {formatPrice(product.Price)}
                </span>

                <span className="text-[10px] font-medium text-slate-600">
                  Toman
                </span>
              </div>

              {hasOldPrice && (
                <span className="mt-1 block text-xs text-slate-600 line-through">
                  {formatPrice(product.OldPrice)}
                </span>
              )}
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 transition-colors group-hover:text-cyan-400">
              View →
            </span>

          </div>
        </div>
      </article>
    </Link>
  );
}