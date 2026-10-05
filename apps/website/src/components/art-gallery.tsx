"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

export type GalleryItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  coverImageUrl: string | null;
  isPaid: boolean;
  priceCents: number | null;
  currency: string;
  publishedAt: Date | string | null;
  author: { name: string | null } | null;
  organization: { name: string; slug: string } | null;
  variants: {
    locale: string;
    format: string;
    title: string;
    summary: string | null;
  }[];
};

type Labels = {
  heroTitle: string;
  heroTagline: string;
  learnMore: string;
  events: string;
  exhibitions: string;
  aboutTitle: string;
  aboutBody: string;
  weekdays: string;
  weekends: string;
  hoursWeek: string;
  hoursWeekend: string;
  buyTickets: string;
  worksTitle: string;
  seeAll: string;
  pricesTitle: string;
  paintings: string;
  graphic: string;
  sculptures: string;
  testimonials: string;
  empty: string;
};

type Props = {
  items: GalleryItem[];
  locale: string;
  labels: Labels;
};

type PriceTab = "paintings" | "graphic" | "sculptures";

function pickVariant(item: GalleryItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

function formatPrice(cents: number | null, currency: string, locale: string) {
  if (cents == null) return null;
  try {
    return new Intl.NumberFormat(locale === "ku" ? "en-US" : locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(0)}`;
  }
}

export function ArtGallery({ items, locale, labels }: Props) {
  const [priceTab, setPriceTab] = useState<PriceTab>("paintings");

  const mosaic = useMemo(() => {
    const covers = items.filter((i) => i.coverImageUrl).map((i) => i.coverImageUrl!);
    if (covers.length === 0) return [];
    const tiles: string[] = [];
    while (tiles.length < 9) tiles.push(...covers);
    return tiles.slice(0, 9);
  }, [items]);

  const works = items.slice(0, 6);
  const priced = useMemo(() => {
    const withPrice = items.filter((i) => i.priceCents != null);
    const pool = withPrice.length > 0 ? withPrice : items;
    // Simple demo split by index into categories
    if (priceTab === "paintings") return pool.filter((_, i) => i % 3 === 0);
    if (priceTab === "graphic") return pool.filter((_, i) => i % 3 === 1);
    return pool.filter((_, i) => i % 3 === 2);
  }, [items, priceTab]);

  const priceCard = priced[0] ?? items[0];
  const quoteItem = items[1] ?? items[0];
  const quoteV = quoteItem ? pickVariant(quoteItem, locale) : null;

  const priceTabs: { id: PriceTab; label: string }[] = [
    { id: "paintings", label: labels.paintings },
    { id: "graphic", label: labels.graphic },
    { id: "sculptures", label: labels.sculptures },
  ];

  if (items.length === 0) {
    return (
      <p className="oak-container py-12 text-sm text-oak-stone">{labels.empty}</p>
    );
  }

  return (
    <div>
      {/* Diagonal hero */}
      <section className="relative isolate overflow-hidden border-b border-oak-rule bg-oak-ink text-oak-bone">
        <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-55" aria-hidden>
          {mosaic.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`${src}-${i}`} src={src} alt="" className="h-full min-h-[8rem] w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-oak-ink/55" aria-hidden />

        <div className="oak-container relative grid min-h-[min(70vh,520px)] lg:grid-cols-[1.35fr_0.9fr]">
          <div className="flex flex-col justify-center border-oak-bone/20 py-12 lg:border-e lg:py-16">
            <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-medium leading-none text-white">
              {labels.heroTitle}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-oak-bone/80 sm:text-base">
              {labels.heroTagline}
            </p>
            <a
              href="#works"
              className="mt-8 inline-flex w-fit items-center justify-center bg-oak-fire px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-oak-fire-dark"
            >
              {labels.learnMore}
            </a>
          </div>

          <div className="grid border-t border-oak-bone/20 lg:border-t-0">
            <a
              href="#works"
              className="flex flex-col justify-end border-b border-oak-bone/20 bg-black/25 p-6 transition-colors hover:bg-black/40 sm:p-8"
            >
              <span className="font-display text-2xl text-white sm:text-3xl">
                {labels.events}
              </span>
            </a>
            <a
              href="#about"
              className="flex flex-col justify-end bg-black/35 p-6 transition-colors hover:bg-black/50 sm:p-8"
            >
              <span className="font-display text-2xl text-white sm:text-3xl">
                {labels.exhibitions}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-oak-rule">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[18rem] bg-oak-sand lg:min-h-[26rem]">
            {items[0]?.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={items[0].coverImageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-oak-ink/25" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/30 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
          <div className="flex flex-col justify-center bg-oak-sand px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
            <h2 className="font-display text-3xl font-medium text-oak-ink sm:text-4xl">
              {labels.aboutTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-oak-stone sm:text-base">
              {labels.aboutBody}
            </p>
            <div className="mt-8 grid max-w-sm grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-bold text-oak-ink">{labels.weekdays}</p>
                <p className="mt-1 text-oak-stone">{labels.hoursWeek}</p>
              </div>
              <div>
                <p className="font-bold text-oak-ink">{labels.weekends}</p>
                <p className="mt-1 text-oak-stone">{labels.hoursWeekend}</p>
              </div>
            </div>
            <a
              href="#prices"
              className="mt-8 inline-flex w-fit border border-oak-fire px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-oak-fire hover:bg-oak-fire hover:text-white"
            >
              {labels.buyTickets}
            </a>
          </div>
        </div>
      </section>

      {/* Works masonry */}
      <section id="works" className="oak-container py-10 sm:py-14">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-oak-rule pb-3">
          <h2 className="font-display text-2xl font-medium text-oak-ink sm:text-3xl">
            {labels.worksTitle}
          </h2>
          <Link
            href="/browse/gallery"
            className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-oak-fire hover:text-oak-fire-dark"
          >
            {labels.seeAll}
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          {works.map((item, i) => {
            const v = pickVariant(item, locale);
            const tall = i === 0 || i === 3;
            return (
              <li
                key={item.id}
                className={
                  tall
                    ? "md:row-span-2"
                    : ""
                }
              >
                <Link href={`/c/${item.slug}`} className="group relative block h-full overflow-hidden bg-oak-sand">
                  {item.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.coverImageUrl}
                      alt=""
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        tall ? "aspect-[3/4] h-full min-h-[14rem] md:aspect-auto md:min-h-full" : "aspect-square"
                      }`}
                    />
                  ) : (
                    <div className="flex aspect-square items-end bg-oak-ink p-3">
                      <span className="font-display text-sm text-oak-bone line-clamp-3">
                        {v?.title}
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-display text-sm text-white line-clamp-2">
                      {v?.title}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Prices + testimonials */}
      <section id="prices" className="border-t border-oak-rule bg-oak-sand">
        <div className="oak-container grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-oak-ink sm:text-3xl">
              {labels.pricesTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-[0.14em]">
              {priceTabs.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setPriceTab(t.id)}
                    className={
                      priceTab === t.id
                        ? "text-oak-fire"
                        : "text-oak-stone hover:text-oak-ink"
                    }
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>

            {priceCard ? (
              <div className="mt-6 bg-oak-paper px-5 py-6 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-oak-ink">
                      {pickVariant(priceCard, locale)?.title}
                    </p>
                    {pickVariant(priceCard, locale)?.summary ? (
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-oak-stone">
                        {pickVariant(priceCard, locale)?.summary}
                      </p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-display text-3xl font-medium text-oak-fire">
                    {formatPrice(
                      priceCard.priceCents ?? 9500,
                      priceCard.currency,
                      locale,
                    )}
                  </p>
                </div>
                <Link
                  href={`/c/${priceCard.slug}`}
                  className="mt-5 inline-flex bg-oak-fire px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-oak-fire-dark"
                >
                  {labels.buyTickets}
                </Link>
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-oak-ink sm:text-3xl">
              {labels.testimonials}
            </h2>
            {quoteItem && quoteV ? (
              <div className="mt-6 flex gap-4 bg-oak-paper px-5 py-6 sm:px-6">
                <div className="min-w-0 flex-1">
                  <span className="font-display text-4xl leading-none text-oak-fire" aria-hidden>
                    “
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-oak-ink sm:text-base">
                    {quoteV.summary ?? quoteV.title}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-oak-stone">
                    {quoteItem.author?.name ?? quoteItem.organization?.name}
                  </p>
                </div>
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oak-ink text-sm font-bold text-oak-bone"
                  aria-hidden
                >
                  {(quoteItem.author?.name ?? "OK")
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
