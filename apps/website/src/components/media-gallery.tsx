"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
  intervalMs?: number;
  className?: string;
};

export function MediaGallery({
  images,
  intervalMs = 4200,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, paused]);

  if (images.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden bg-oak-sand ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
        {images.map((image, i) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain object-center p-3 sm:p-5"
              sizes="(max-width: 768px) 100vw, 420px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-oak-fire"
                  : "w-1.5 bg-oak-ink/25 hover:bg-oak-ink/45"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
