"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/image";
import type { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  title: string;
  picture?: ProductImage | null;
  gallery?: ProductImage[] | null;
}

export default function ProductGallery({
  title,
  picture,
  gallery,
}: ProductGalleryProps) {
  const images: ProductImage[] = [];

  if (picture) {
    images.push(picture);
  }

  if (gallery) {
    for (const image of gallery) {
      const alreadyExists = images.some(
        (item) => item.id === image.id
      );

      if (!alreadyExists) {
        images.push(image);
      }
    }
  }

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const selectedImage = images[selectedIndex];

  const imageUrl = getImageUrl(
    selectedImage?.url
  );

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090c10]">
        <div className="flex h-full items-center justify-center">
          <span className="text-6xl font-black text-cyan-400/60">
            N
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}

      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090c10]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={
              selectedImage?.alternativeText ||
              title
            }
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl font-black text-cyan-400/60">
              N
            </span>
          </div>
        )}

        {/* Image counter */}

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => {
            const thumbnailUrl = getImageUrl(
              image.url
            );

            const isSelected =
              index === selectedIndex;

            return (
              <button
                key={`${image.id}-${index}`}
                type="button"
                onClick={() =>
                  setSelectedIndex(index)
                }
                aria-label={`View image ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-[#090c10] transition-all ${
                  isSelected
                    ? "border-cyan-400/60 ring-1 ring-cyan-400/20"
                    : "border-white/[0.07] hover:border-white/20"
                }`}
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={
                      image.alternativeText ||
                      `${title} image ${index + 1}`
                    }
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm font-black text-cyan-400/60">
                    N
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}