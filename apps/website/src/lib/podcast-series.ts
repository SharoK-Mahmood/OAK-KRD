import type { PodcastItem } from "@/components/podcasts-storefront";

export type PodcastShow = {
  seriesSlug: string;
  title: string;
  coverImageUrl: string | null;
  organization: PodcastItem["organization"];
  author: PodcastItem["author"];
  publishedAt: Date | string | null;
  episodeCount: number;
  latestEpisode: PodcastItem;
  episodes: PodcastItem[];
};

/** Group podcast episodes into shows. Uses seriesSlug, or the content slug if unset. */
export function groupPodcastShows(podcasts: PodcastItem[]): PodcastShow[] {
  const map = new Map<string, PodcastItem[]>();

  for (const item of podcasts) {
    const key = item.seriesSlug || item.slug;
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }

  const shows: PodcastShow[] = [];
  for (const [seriesSlug, episodes] of map) {
    const sorted = [...episodes].sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });
    const latest = sorted[0];
    shows.push({
      seriesSlug,
      title: latest.title,
      coverImageUrl: latest.coverImageUrl,
      organization: latest.organization,
      author: latest.author,
      publishedAt: latest.publishedAt,
      episodeCount: sorted.length,
      latestEpisode: latest,
      episodes: sorted,
    });
  }

  return shows.sort((a, b) => {
    const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return tb - ta;
  });
}
