"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

export type BookShopItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  type: string;
  coverImageUrl: string | null;
  isPaid: boolean;
  priceCents: number | null;
  currency: string;
  author: { name: string | null } | null;
  variants: {
    locale: string;
    format: string;
    title: string;
    summary: string | null;
  }[];
};

type Labels = {
  newArrivals: string;
  books: string;
  ebooks: string;
  audio: string;
  by: string;
  empty: string;
};

type Props = {
  books: BookShopItem[];
  locale: string;
  labels: Labels;
};

type TabId = "new" | "books" | "ebooks" | "audio";

function pickVariant(item: BookShopItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

function formatPrice(
  cents: number | null,
  currency: string,
  locale: string,
) {
  if (cents == null) return null;
  try {
    return new Intl.NumberFormat(locale === "ku" ? "en-US" : locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(0)}`;
  }
}

function byline(item: BookShopItem, locale: string, byLabel: string) {
  const variant = pickVariant(item, locale);
  const fromSubtitle = item.subtitle
    ?.split("·")[0]
    ?.replace(/^by\s+/i, "")
    .trim();
  const name = fromSubtitle || item.author?.name;
  if (!name) return null;
  return `${byLabel} ${name}`;
}

function FormatIcons({ type }: { type: string }) {
  return (
    <span className="flex items-center gap-1.5 text-oak-stone" aria-hidden>
      {(type === "BOOK" || type === "EBOOK" || type === "AUDIOBOOK") && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )}
      {type === "EBOOK" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      )}
      {type === "AUDIOBOOK" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M3 14v-4a9 9 0 0 1 18 0v4" />
          <path d="M21 16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3zM3 16a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3z" />
        </svg>
      )}
    </span>
  );
}

export function BooksStorefront({ books, locale, labels }: Props) {
  const [tab, setTab] = useState<TabId>("new");

  const filtered = useMemo(() => {
    if (tab === "books") return books.filter((b) => b.type === "BOOK");
    if (tab === "ebooks") return books.filter((b) => b.type === "EBOOK");
    if (tab === "audio") return books.filter((b) => b.type === "AUDIOBOOK");
    return books;
  }, [books, tab]);

  const covers = useMemo(
    () => books.filter((b) => b.coverImageUrl).map((b) => b.coverImageUrl!),
    [books],
  );

  const mosaic = useMemo(() => {
    if (covers.length === 0) return [];
    const tiles: string[] = [];
    while (tiles.length < 24) {
      tiles.push(...covers);
    }
    return tiles.slice(0, 24);
  }, [covers]);

  const featured = books[0];
  const featuredVariant = featured ? pickVariant(featured, locale) : null;
  const strip = books.filter((b) => b.coverImageUrl).slice(0, 5);

  const tabs: { id: TabId; label: string }[] = [
    { id: "new", label: labels.newArrivals },
    { id: "books", label: labels.books },
    { id: "ebooks", label: labels.ebooks },
    { id: "audio", label: labels.audio },
  ];

  return (
    <div>
      {/* Hero — background is available book covers */}
      <section className="relative isolate min-h-[min(72vh,560px)] overflow-hidden border-b border-oak-rule bg-oak-ink text-oak-bone">
        <div
          className="absolute inset-0 grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-8"
          aria-hidden
        >
          {mosaic.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className="h-full min-h-[7rem] w-full object-cover"
            />
          ))}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
          aria-hidden
        />

        <div className="oak-container relative flex min-h-[min(72vh,560px)] flex-col justify-end pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="max-w-xl lg:col-span-7">
              {featured && featuredVariant ? (
                <>
                  <p className="kicker !text-oak-bone/70">{labels.newArrivals}</p>
                  <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-[1.15] text-white">
                    <Link
                      href={`/c/${featured.slug}`}
                      className="transition-opacity hover:opacity-90"
                    >
                      {featuredVariant.title}
                    </Link>
                  </h1>
                  {byline(featured, locale, labels.by) ? (
                    <p className="mt-2 text-sm text-oak-bone/75 sm:text-base">
                      {byline(featured, locale, labels.by)}
                    </p>
                  ) : null}
                  {featuredVariant.summary ? (
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-oak-bone/80 line-clamp-4 sm:text-base sm:line-clamp-5">
                      {featuredVariant.summary}
                    </p>
                  ) : null}
                  {featured.priceCents != null ? (
                    <p className="mt-5 font-display text-2xl font-medium text-white">
                      <span className="text-oak-fire">
                        {formatPrice(
                          featured.priceCents,
                          featured.currency,
                          locale,
                        )}
                      </span>
                    </p>
                  ) : null}
                </>
              ) : (
                <h1 className="font-display text-3xl text-white">
                  {labels.newArrivals}
                </h1>
              )}
            </div>

            {strip.length > 0 ? (
              <div className="lg:col-span-5">
                <ul className="flex gap-2.5 overflow-x-auto pb-1 sm:gap-3 lg:justify-end">
                  {strip.map((book) => {
                    const v = pickVariant(book, locale);
                    return (
                      <li key={book.id} className="shrink-0">
                        <Link
                          href={`/c/${book.slug}`}
                          className="block w-[4.5rem] overflow-hidden border border-white/20 bg-black/30 shadow-lg transition-transform hover:-translate-y-1 sm:w-24"
                          title={v?.title ?? book.title}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={book.coverImageUrl!}
                            alt={v?.title ?? book.title}
                            className="aspect-[2/3] w-full object-cover"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav
        className="border-b border-oak-rule bg-oak-paper"
        aria-label="Book categories"
      >
        <div className="oak-container">
          <ul className="nav-scroll flex gap-5 overflow-x-auto py-3 text-sm sm:gap-7 sm:py-3.5">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <li key={t.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`relative pb-1 font-medium transition-colors ${
                      active
                        ? "text-oak-fire"
                        : "text-oak-stone hover:text-oak-ink"
                    }`}
                  >
                    {t.label}
                    {active ? (
                      <span className="absolute inset-x-0 -bottom-[0.85rem] h-0.5 bg-oak-fire sm:-bottom-[0.95rem]" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Grid */}
      <section className="oak-container py-8 sm:py-10">
        <div className="mb-6 flex items-center gap-2 border-b border-oak-rule pb-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="text-oak-fire"
            aria-hidden
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h2 className="font-display text-xl font-medium text-oak-ink sm:text-2xl">
            {tabs.find((t) => t.id === tab)?.label ?? labels.newArrivals}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-oak-stone">{labels.empty}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-6">
            {filtered.map((book) => {
              const v = pickVariant(book, locale);
              const price = formatPrice(
                book.priceCents,
                book.currency,
                locale,
              );
              return (
                <li key={book.id}>
                  <Link href={`/c/${book.slug}`} className="group block">
                    <div className="overflow-hidden bg-oak-sand">
                      {book.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverImageUrl}
                          alt=""
                          className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex aspect-[2/3] items-end bg-oak-clay/40 p-3">
                          <span className="font-display text-sm text-oak-ink line-clamp-4">
                            {v?.title ?? book.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2.5 flex items-start justify-between gap-2">
                      <FormatIcons type={book.type} />
                      {price ? (
                        <span className="shrink-0 text-sm font-bold text-oak-fire">
                          {price}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-1.5 font-display text-sm font-medium leading-snug text-oak-ink group-hover:text-oak-fire sm:text-[0.95rem]">
                      {v?.title ?? book.title}
                    </h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
