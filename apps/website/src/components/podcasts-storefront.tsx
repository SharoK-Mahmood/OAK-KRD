"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { groupPodcastShows } from "@/lib/podcast-series";

export type PodcastItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | string | null;
  seriesSlug: string | null;
  variants: Array<{
    locale: string;
    format: string;
    title: string;
    summary: string | null;
    durationSeconds: number | null;
    assets: Array<{
      kind: string;
      url: string;
      meta: unknown;
    }>;
  }>;
  author: { name: string | null; image?: string | null } | null;
  organization: { name: string; slug: string } | null;
};

type Labels = {
  discover: string;
  library: string;
  charts: string;
  newReleases: string;
  featured: string;
  topCharts: string;
  thisWeek: string;
  thisMonth: string;
  empty: string;
  episodes: string;
  episode: string;
};

type Props = {
  podcasts: PodcastItem[];
  locale: string;
  labels: Labels;
};

type ViewTab = "discover" | "library" | "charts";

function yearOf(date: Date | string | null) {
  if (!date) return "";
  return String(new Date(date).getFullYear());
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
      className={`flex items-end bg-oak-ink p-3 font-display text-oak-bone ${className}`}
    >
      <span className="line-clamp-3 text-sm">{title}</span>
    </div>
  );
}

function episodeLabel(count: number, labels: Labels) {
  return `${count} ${count === 1 ? labels.episode : labels.episodes}`;
}

export function PodcastsStorefront({ podcasts, locale: _locale, labels }: Props) {
  const [view, setView] = useState<ViewTab>("discover");
  const [range, setRange] = useState<"week" | "month">("week");

  const shows = useMemo(() => groupPodcastShows(podcasts), [podcasts]);
  const featured = shows.slice(0, 2);
  const releases = shows.slice(0, 8);
  const charts = shows.slice(0, 6);

  const navTabs: { id: ViewTab; label: string }[] = [
    { id: "library", label: labels.library },
    { id: "discover", label: labels.discover },
    { id: "charts", label: labels.charts },
  ];

  return (
    <div>
      <div className="border-b border-oak-rule bg-oak-paper/80">
        <div className="oak-container flex flex-wrap items-center justify-between gap-3 py-4">
          <nav aria-label="Podcast views">
            <ul className="flex flex-wrap gap-1.5">
              {navTabs.map((t) => {
                const on = view === t.id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setView(t.id)}
                      className={`px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                        on
                          ? "bg-oak-fire text-white"
                          : "bg-oak-sand text-oak-ink hover:bg-oak-clay"
                      }`}
                    >
                      {t.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex gap-1.5">
            {(
              [
                ["week", labels.thisWeek],
                ["month", labels.thisMonth],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRange(id)}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  range === id
                    ? "bg-oak-ink text-oak-bone"
                    : "text-oak-stone hover:text-oak-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {shows.length === 0 ? (
        <p className="oak-container py-12 text-sm text-oak-stone">{labels.empty}</p>
      ) : (
        <div className="oak-container grid gap-8 py-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10 lg:py-10">
          <aside className={view === "charts" ? "block" : "hidden lg:block"}>
            <h2 className="font-display text-xl font-medium text-oak-ink">
              {labels.topCharts}
            </h2>
            <ol className="mt-4 space-y-3">
              {charts.map((show, i) => (
                <li key={show.seriesSlug}>
                  <Link
                    href={`/podcasts/${show.seriesSlug}`}
                    className="flex w-full items-center gap-3 text-start transition-opacity hover:opacity-100 opacity-90"
                  >
                    <span className="w-5 shrink-0 text-sm font-bold text-oak-stone">
                      {i + 1}
                    </span>
                    <Cover
                      src={show.coverImageUrl}
                      title={show.title}
                      className="h-12 w-12 shrink-0"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-oak-ink">
                        {show.title}
                      </span>
                      <span className="block truncate text-xs text-oak-stone">
                        {episodeLabel(show.episodeCount, labels)}
                        {yearOf(show.publishedAt)
                          ? ` · ${yearOf(show.publishedAt)}`
                          : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>

          <div className={view === "charts" ? "hidden lg:block" : "block"}>
            {(view === "discover" || view === "library") && (
              <>
                <div className="mb-6 flex items-end justify-between gap-3">
                  <h2 className="font-display text-2xl font-medium text-oak-ink sm:text-3xl">
                    {labels.newReleases}
                  </h2>
                </div>

                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
                  {releases.map((show) => (
                    <li key={show.seriesSlug}>
                      <Link
                        href={`/podcasts/${show.seriesSlug}`}
                        className="group block w-full text-start"
                      >
                        <div className="relative overflow-hidden bg-oak-sand">
                          <Cover
                            src={show.coverImageUrl}
                            title={show.title}
                            className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
                            <span className="rounded-full bg-oak-fire px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                              {episodeLabel(show.episodeCount, labels)}
                            </span>
                          </span>
                        </div>
                        <p className="mt-2 truncate text-sm font-semibold text-oak-ink">
                          {show.title}
                        </p>
                        <p className="truncate text-xs text-oak-stone">
                          {show.organization?.name ?? show.author?.name}
                          {yearOf(show.publishedAt)
                            ? ` · ${yearOf(show.publishedAt)}`
                            : ""}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <h2 className="mt-10 font-display text-2xl font-medium text-oak-ink sm:mt-12 sm:text-3xl">
                  {labels.featured}
                </h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {featured.map((show) => (
                    <li key={show.seriesSlug}>
                      <Link
                        href={`/podcasts/${show.seriesSlug}`}
                        className="group relative block w-full overflow-hidden bg-oak-ink text-start"
                      >
                        <Cover
                          src={show.coverImageUrl}
                          title={show.title}
                          className="aspect-[16/10] w-full opacity-80 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                          <p className="font-display text-xl font-medium text-white sm:text-2xl">
                            {show.title}
                          </p>
                          <p className="mt-1 text-sm text-white/75">
                            {episodeLabel(show.episodeCount, labels)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
