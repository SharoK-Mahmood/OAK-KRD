"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
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
  recentlyAdded: string;
  all: string;
  trending: string;
  international: string;
  politics: string;
  business: string;
  empty: string;
  by: string;
};

type Props = {
  items: NewsItem[];
  locale: string;
  labels: Labels;
};

type FilterId = "all" | "trending" | "international" | "politics" | "business";

function pickVariant(item: NewsItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

function formatDate(value: Date | string | null, locale: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ku" ? "en-GB" : locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function categoryOf(item: NewsItem) {
  return item.organization?.name ?? "News";
}

function matchesFilter(item: NewsItem, filter: FilterId, locale: string) {
  if (filter === "all") return true;
  if (filter === "trending") return Boolean(item.coverImageUrl);
  const hay = [
    item.title,
    item.organization?.name,
    ...item.variants.map((v) => `${v.title} ${v.summary ?? ""}`),
  ]
    .join(" ")
    .toLowerCase();

  if (filter === "international") {
    return /syria|iran|uk|fairford|syria|سووریا|بەریتان|ئێران|international|world/.test(
      hay,
    );
  }
  if (filter === "politics") {
    return /abdi|syria|government|politics|سیاس|سەرۆک|حکومەت|هەسەدە|kirkuk|کەرکووک/.test(
      hay,
    );
  }
  if (filter === "business") {
    return /dinar|economy|business|ئابوور|دینار|social.?protect|پاراستنی/.test(
      hay,
    );
  }
  return true;
}

function AuthorMeta({
  item,
  locale,
  byLabel,
}: {
  item: NewsItem;
  locale: string;
  byLabel: string;
}) {
  const name = item.author?.name;
  const date = formatDate(item.publishedAt, locale);
  if (!name && !date) return null;
  const initials = (name ?? "O")
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mt-4 flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oak-ink text-[10px] font-bold text-oak-bone"
        aria-hidden
      >
        {initials}
      </span>
      <span className="text-xs text-oak-stone">
        {name ? (
          <>
            <span className="font-semibold text-oak-ink">
              {byLabel} {name}
            </span>
            {date ? <span> · {date}</span> : null}
          </>
        ) : (
          date
        )}
      </span>
    </div>
  );
}

export function NewsMagazine({ items, locale, labels }: Props) {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(
    () => items.filter((item) => matchesFilter(item, filter, locale)),
    [items, filter, locale],
  );

  const lead = filtered[0] ?? items[0];
  const sideA = filtered[1] ?? items[1];
  const sideB = filtered[2] ?? items[2];
  const recentFeatured = filtered[3] ?? filtered[1] ?? items[0];
  const recentGrid = (filtered.length > 4 ? filtered : items).slice(4, 8);
  const listPair = (filtered.length > 8 ? filtered : items).slice(8, 10);
  const wideFeature = (filtered.length > 2 ? filtered : items)[2] ?? items[0];
  const rail = (filtered.length > 0 ? filtered : items).slice(0, 5);

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "trending", label: labels.trending },
    { id: "international", label: labels.international },
    { id: "politics", label: labels.politics },
    { id: "business", label: labels.business },
  ];

  if (items.length === 0) {
    return (
      <p className="oak-container py-12 text-sm text-oak-stone">{labels.empty}</p>
    );
  }

  const leadV = lead ? pickVariant(lead, locale) : null;
  const sideAV = sideA ? pickVariant(sideA, locale) : null;
  const sideBV = sideB ? pickVariant(sideB, locale) : null;

  return (
    <div>
      {/* Hero */}
      <section className="oak-container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
          {lead && leadV ? (
            <div className="flex flex-col justify-center lg:col-span-4">
              <p className="kicker">{categoryOf(lead)}</p>
              <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] text-oak-ink">
                <Link href={`/c/${lead.slug}`} className="hover:text-oak-fire">
                  {leadV.title}
                </Link>
              </h1>
              {leadV.summary ? (
                <p className="mt-4 text-sm leading-relaxed text-oak-stone sm:text-base">
                  {leadV.summary}
                </p>
              ) : null}
              <AuthorMeta item={lead} locale={locale} byLabel={labels.by} />
            </div>
          ) : null}

          {lead?.coverImageUrl ? (
            <div className="lg:col-span-5">
              <Link href={`/c/${lead.slug}`} className="block overflow-hidden bg-oak-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.coverImageUrl}
                  alt=""
                  className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:min-h-[28rem] lg:object-cover"
                />
              </Link>
            </div>
          ) : (
            <div className="bg-oak-sand lg:col-span-5" />
          )}

          <div className="flex flex-col gap-4 lg:col-span-3">
            {sideA && sideAV ? (
              <Link
                href={`/c/${sideA.slug}`}
                className="group relative block min-h-[12rem] flex-1 overflow-hidden bg-oak-ink"
              >
                {sideA.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sideA.coverImageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                    {categoryOf(sideA)}
                  </span>
                  <p className="mt-1 font-display text-lg leading-snug text-white">
                    {sideAV.title}
                  </p>
                </div>
              </Link>
            ) : null}

            {sideB && sideBV ? (
              <Link
                href={`/c/${sideB.slug}`}
                className="flex flex-1 items-center gap-3 bg-oak-sand px-4 py-5"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                    {categoryOf(sideB)}
                  </span>
                  <p className="mt-2 font-display text-base leading-snug text-oak-ink line-clamp-4">
                    “{sideBV.summary ?? sideBV.title}”
                  </p>
                </div>
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oak-ink text-xs font-bold text-oak-bone"
                  aria-hidden
                >
                  {(sideB.author?.name ?? "OK")
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Recently added */}
      <section className="border-t border-oak-rule bg-oak-paper/60">
        <div className="oak-container py-8 sm:py-10">
          <div className="flex flex-col gap-4 border-b border-oak-rule pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-2xl font-medium text-oak-ink sm:text-3xl">
              {labels.recentlyAdded}
            </h2>
            <ul className="nav-scroll flex gap-4 overflow-x-auto text-[11px] font-bold uppercase tracking-[0.14em] text-oak-stone">
              {filters.map((f) => (
                <li key={f.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={
                      filter === f.id
                        ? "text-oak-fire"
                        : "hover:text-oak-ink"
                    }
                  >
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-8 text-sm text-oak-stone">{labels.empty}</p>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
              {recentFeatured ? (
                <Link
                  href={`/c/${recentFeatured.slug}`}
                  className="group relative block min-h-[22rem] overflow-hidden bg-oak-ink lg:col-span-5"
                >
                  {recentFeatured.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={recentFeatured.coverImageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-xl leading-snug text-white sm:text-2xl">
                      {pickVariant(recentFeatured, locale)?.title}
                    </p>
                    <p className="mt-2 text-xs text-white/70">
                      {recentFeatured.author?.name}
                      {recentFeatured.publishedAt
                        ? ` · ${formatDate(recentFeatured.publishedAt, locale)}`
                        : ""}
                    </p>
                  </div>
                </Link>
              ) : null}

              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {(recentGrid.length > 0
                  ? recentGrid
                  : filtered.slice(0, 4)
                ).map((item) => {
                  const v = pickVariant(item, locale);
                  return (
                    <li key={item.id}>
                      <Link href={`/c/${item.slug}`} className="group block">
                        {item.coverImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.coverImageUrl}
                            alt=""
                            className="aspect-[16/10] w-full object-cover"
                          />
                        ) : (
                          <div className="aspect-[16/10] bg-oak-sand" />
                        )}
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                          {categoryOf(item)}
                        </p>
                        <h3 className="mt-1 font-display text-base leading-snug text-oak-ink group-hover:text-oak-fire sm:text-lg">
                          {v?.title}
                        </h3>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Mixed row */}
      <section className="oak-container py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <ul className="space-y-6 lg:col-span-5">
            {(listPair.length > 0 ? listPair : items.slice(1, 3)).map((item) => {
              const v = pickVariant(item, locale);
              return (
                <li key={item.id}>
                  <Link
                    href={`/c/${item.slug}`}
                    className="group flex gap-4 border-b border-oak-rule pb-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                        {categoryOf(item)}
                      </p>
                      <h3 className="mt-1 font-display text-lg leading-snug text-oak-ink group-hover:text-oak-fire">
                        {v?.title}
                      </h3>
                      {v?.summary ? (
                        <p className="mt-2 line-clamp-2 text-sm text-oak-stone">
                          {v.summary}
                        </p>
                      ) : null}
                      <AuthorMeta
                        item={item}
                        locale={locale}
                        byLabel={labels.by}
                      />
                    </div>
                    {item.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.coverImageUrl}
                        alt=""
                        className="h-24 w-24 shrink-0 object-cover sm:h-28 sm:w-28"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {wideFeature ? (
            <Link
              href={`/c/${wideFeature.slug}`}
              className="group relative block min-h-[16rem] overflow-hidden bg-oak-ink lg:col-span-7 lg:min-h-[22rem]"
            >
              {wideFeature.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={wideFeature.coverImageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/50" />
              <div className="relative p-5 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                  {categoryOf(wideFeature)}
                </p>
                <h3 className="mt-2 max-w-xl font-display text-2xl leading-snug text-white sm:text-3xl">
                  {pickVariant(wideFeature, locale)?.title}
                </h3>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      {/* Bottom rail */}
      <section className="border-t border-oak-rule">
        <div className="oak-container py-6 sm:py-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {rail.map((item) => {
              const v = pickVariant(item, locale);
              return (
                <li key={`rail-${item.id}`}>
                  <Link href={`/c/${item.slug}`} className="group flex gap-3">
                    {item.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.coverImageUrl}
                        alt=""
                        className="h-14 w-14 shrink-0 object-cover"
                      />
                    ) : (
                      <span className="h-14 w-14 shrink-0 bg-oak-sand" />
                    )}
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                        {categoryOf(item)}
                      </span>
                      <span className="mt-0.5 block font-display text-sm leading-snug text-oak-ink line-clamp-2 group-hover:text-oak-fire">
                        {v?.title}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
