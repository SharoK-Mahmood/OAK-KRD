import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@oak-krd/database";
import { PodcastSeriesView } from "@/components/podcast-series-view";
import type { PodcastItem } from "@/components/podcasts-storefront";

type Props = {
  params: Promise<{ locale: string; series: string }>;
};

export const revalidate = 60;

async function fetchSeriesEpisodes(series: string): Promise<PodcastItem[]> {
  const bySeries = await prisma.content.findMany({
    where: {
      type: "PODCAST",
      publishedAt: { not: null },
      seriesSlug: series,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      coverImageUrl: true,
      publishedAt: true,
      seriesSlug: true,
      variants: {
        where: { status: "PUBLISHED" },
        select: {
          locale: true,
          format: true,
          title: true,
          summary: true,
          durationSeconds: true,
          assets: {
            where: { kind: { in: ["audio", "video"] } },
            select: { kind: true, url: true, meta: true },
            take: 3,
          },
        },
        take: 3,
      },
      author: { select: { name: true } },
      organization: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
  });

  if (bySeries.length > 0) return bySeries;

  // Single-episode shows that never got a seriesSlug use content.slug as the key
  const lone = await prisma.content.findFirst({
    where: {
      type: "PODCAST",
      publishedAt: { not: null },
      slug: series,
      seriesSlug: null,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      coverImageUrl: true,
      publishedAt: true,
      seriesSlug: true,
      variants: {
        where: { status: "PUBLISHED" },
        select: {
          locale: true,
          format: true,
          title: true,
          summary: true,
          durationSeconds: true,
          assets: {
            where: { kind: { in: ["audio", "video"] } },
            select: { kind: true, url: true, meta: true },
            take: 3,
          },
        },
        take: 3,
      },
      author: { select: { name: true } },
      organization: { select: { name: true, slug: true } },
    },
  });

  return lone ? [lone] : [];
}

export default async function PodcastSeriesPage({ params }: Props) {
  const { locale, series } = await params;
  setRequestLocale(locale);

  const episodes = await fetchSeriesEpisodes(series);
  if (episodes.length === 0) notFound();

  const t = await getTranslations("podcastsShop");
  const sections = await getTranslations("sections");
  const latest = episodes[0];

  return (
    <PodcastSeriesView
      seriesTitle={latest.title}
      seriesSlug={series}
      coverImageUrl={latest.coverImageUrl}
      organizationName={latest.organization?.name ?? latest.author?.name ?? null}
      episodes={episodes}
      locale={locale}
      labels={{
        episodes: t("episodes"),
        episode: t("episode"),
        backToPodcasts: t("backToPodcasts"),
        nowPlaying: t("nowPlaying"),
        play: t("play"),
        pause: t("pause"),
        empty: sections("empty"),
        listenVideo: t("listenVideo"),
        listenAudio: t("listenAudio"),
        chooseFormat: t("chooseFormat"),
      }}
    />
  );
}
