"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

export type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  publishedAt: Date | string | null;
  author: { name: string | null; image?: string | null } | null;
  organization: { name: string; slug: string } | null;
  variants: {
    locale: string;
    format: string;
    title: string;
    summary: string | null;
  }[];
};

type Labels = {
  exhibitions: string;
  latest: string;
  latestSub: string;
  viewMore: string;
  showLess: string;
  empty: string;
  on: string;
};

type Props = {
  articles: ArticleItem[];
  locale: string;
  labels: Labels;
};

function pickVariant(item: ArticleItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

function formatDate(value: Date | string | null, locale: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ku" ? "en-GB" : locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function Cover({
  src,
  title,
  className = "",
}: {
  src: string | null;
  title: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-end bg-gradient-to-br from-oak-ink via-oak-ink to-oak-fire/80 p-4 ${className}`}
    >
      <span className="font-display text-lg leading-snug text-oak-bone line-clamp-4">
        {title}
      </span>
    </div>
  );
}

export function ArticlesGallery({ articles, locale, labels }: Props) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const featured = articles[0];
  const featuredV = featured ? pickVariant(featured, locale) : null;
  const exhibition = articles;
  const latest = useMemo(() => articles.slice(0, 6), [articles]);
  const latestPage = showAll
    ? latest
    : latest.slice(page * 3, page * 3 + 3);

  function scrollExhibition(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(320, el.clientWidth * 0.7);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  function cycleLatest(dir: -1 | 1) {
    const pages = Math.max(1, Math.ceil(latest.length / 3));
    setPage((p) => (p + dir + pages) % pages);
  }

  if (articles.length === 0) {
    return (
      <p className="oak-container py-12 text-sm text-oak-stone">{labels.empty}</p>
    );
  }

  return (
    <div>
      {/* Featured hero — text + large image */}
      {featured && featuredV ? (
        <section className="border-b border-oak-rule">
          <div className="oak-container grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
            <div className="max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-oak-stone">
                {formatDate(featured.publishedAt, locale)}
                {featured.organization?.name
                  ? ` · ${featured.organization.name}`
                  : ""}
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-medium leading-[1.15] text-oak-ink">
                <Link href={`/c/${featured.slug}`} className="hover:text-oak-fire">
                  {featuredV.title}
                </Link>
              </h1>
              {featuredV.summary ? (
                <p className="mt-5 text-sm leading-relaxed text-oak-stone sm:text-base">
                  {featuredV.summary}
                </p>
              ) : null}
              {featured.author?.name ? (
                <div className="mt-6 flex items-center gap-3">
                  {featured.author.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.author.image}
                      alt={featured.author.name}
                      className="h-12 w-12 rounded-full object-cover object-top ring-1 ring-oak-rule"
                    />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-oak-ink text-xs font-bold text-oak-bone">
                      {featured.author.name
                        .split(/\s+/)
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-oak-ink">
                      {featured.author.name}
                    </p>
                    <p className="text-xs text-oak-stone">
                      {formatDate(featured.publishedAt, locale)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <Link
              href={`/c/${featured.slug}`}
              className="block overflow-hidden bg-oak-sand shadow-[0_12px_40px_rgba(26,21,18,0.12)]"
            >
              <Cover
                src={featured.coverImageUrl}
                title={featuredV.title}
                className="aspect-[4/5] w-full sm:aspect-[5/6] lg:max-h-[36rem]"
              />
            </Link>
          </div>
        </section>
      ) : null}

      {/* Exhibitions-style carousel */}
      <section className="border-b border-oak-rule bg-oak-paper/70">
        <div className="oak-container py-12 sm:py-16">
          <h2 className="text-center font-display text-3xl font-medium text-oak-ink sm:text-4xl">
            {labels.exhibitions}
          </h2>
          <div className="mx-auto mt-4 h-8 w-px bg-oak-rule" aria-hidden />

          <ul
            ref={scrollerRef}
            className="mt-10 flex gap-6 overflow-x-auto pb-2 scroll-smooth sm:gap-8 md:gap-10"
            style={{ scrollbarWidth: "none" }}
          >
            {exhibition.map((item) => {
              const v = pickVariant(item, locale);
              return (
                <li
                  key={item.id}
                  className="w-[min(70vw,15rem)] shrink-0 sm:w-56 md:w-60"
                >
                  <Link href={`/c/${item.slug}`} className="group block text-center">
                    <div className="overflow-hidden bg-oak-sand shadow-[0_10px_28px_rgba(26,21,18,0.1)] transition-transform duration-500 group-hover:-translate-y-1">
                      <Cover
                        src={item.coverImageUrl}
                        title={v?.title ?? item.title}
                        className="aspect-square w-full"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-base leading-snug text-oak-ink group-hover:text-oak-fire sm:text-lg">
                      {v?.title ?? item.title}
                    </h3>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-oak-stone">
                      {formatDate(item.publishedAt, locale)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollExhibition(-1)}
              className="flex h-9 w-9 items-center justify-center border border-oak-rule text-oak-ink transition-colors hover:border-oak-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollExhibition(1)}
              className="flex h-9 w-9 items-center justify-center border border-oak-rule text-oak-ink transition-colors hover:border-oak-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Latest articles — 3-up grid */}
      <section className="bg-oak-sand">
        <div className="oak-container py-12 sm:py-16">
          <h2 className="text-center font-display text-3xl font-medium text-oak-ink sm:text-4xl">
            {labels.latest}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-oak-stone sm:text-base">
            {labels.latestSub}
          </p>

          <ul className={`mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10`}>
            {(latestPage.length > 0 ? latestPage : latest.slice(0, 3)).map(
              (item) => {
                const v = pickVariant(item, locale);
                const author = item.author?.name;
                const date = formatDate(item.publishedAt, locale);
                return (
                  <li key={item.id}>
                    <Link href={`/c/${item.slug}`} className="group block">
                      <Cover
                        src={item.coverImageUrl}
                        title={v?.title ?? item.title}
                        className="aspect-[3/4] w-full"
                      />
                      <p className="mt-3 text-xs text-oak-stone">
                        {author && date
                          ? `${author} ${labels.on} ${date}`
                          : author || date}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-oak-ink group-hover:text-oak-fire sm:text-xl">
                        {v?.title ?? item.title}
                      </h3>
                    </Link>
                  </li>
                );
              },
            )}
          </ul>

          <div className="mt-10 flex justify-center gap-3">
            {!showAll && latest.length > 3 ? (
              <>
                <button
                  type="button"
                  onClick={() => cycleLatest(-1)}
                  className="border border-oak-rule px-3 py-2 text-oak-ink hover:border-oak-ink"
                  aria-label="Previous page"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => cycleLatest(1)}
                  className="border border-oak-rule px-3 py-2 text-oak-ink hover:border-oak-ink"
                  aria-label="Next page"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            ) : null}
            {latest.length > 3 ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex items-center justify-center bg-oak-ink px-6 py-2.5 text-sm font-semibold text-oak-bone hover:bg-oak-fire"
              >
                {showAll ? labels.showLess : labels.viewMore}
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
