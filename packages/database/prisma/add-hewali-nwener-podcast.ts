/**
 * Episodes for series هەواڵی نوێنەر (seriesSlug: hewali-nwener)
 * Run: npx tsx prisma/add-hewali-nwener-podcast.ts
 *
 * Add more episodes to the `episodes` array with the same SERIES_SLUG.
 */
import { prisma } from "../src/index";

const SERIES_SLUG = "hewali-nwener";
const SERIES_KU = "هەواڵی نوێنەر";
const SERIES_EN = "Nwenar News";

type Episode = {
  slug: string;
  youtubeId?: string;
  /** Public path under apps/website/public, e.g. /video/podcasts/foo.mp4 */
  videoUrl?: string;
  /** Public path under apps/website/public, e.g. /audio/podcasts/foo.mp3 */
  audioUrl?: string;
  coverImageUrl?: string;
  durationSeconds?: number;
  ku: { title: string; body?: string };
  en: { title: string; body?: string };
  publishedAt?: Date;
};

const episodes: Episode[] = [
  {
    slug: "podcast-hewali-nwener-america-iran-plan",
    videoUrl: "/video/podcasts/hewali-nwener-america-iran-plan.mp4",
    audioUrl: "/audio/podcasts/hewali-nwener-america-iran-plan.mp3",
    coverImageUrl: "/images/podcasts/hewali-nwener-america-iran-plan.svg",
    ku: {
      title:
        "ئەمریکا وەڵامی پلانەکەی ئێرانی داوەتەوە و ناکۆکن لەسەر شێوازی جێبەجێکردنی",
    },
    en: {
      title:
        "America Responds to Iran’s Plan — Disagreement Over How to Implement It",
    },
  },
  {
    slug: "podcast-hewali-nwener-mideast-sunnah-resistance",
    youtubeId: "ODTYOsUDSOA",
    audioUrl: "/audio/podcasts/hewali-nwener-mideast-sunnah-resistance.mp3",
    durationSeconds: 1777,
    ku: {
      title:
        "رۆژهەڵاتی نێوەڕاستی نوێ، گەشەی بەرەی سوننە و پاشەکشەی بەرەی مقاوەمە",
    },
    en: {
      title:
        "The New Middle East: Growth of the Sunni Front and the Retreat of the Resistance Axis",
    },
  },
];

async function upsertEpisode(
  ep: Episode,
  authorId: string,
  organizationId: string,
  index: number,
) {
  const cover =
    ep.coverImageUrl ??
    (ep.youtubeId
      ? `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`
      : null);
  const publishedAt =
    ep.publishedAt ?? new Date(Date.now() - index * 864e5);

  const existing = await prisma.content.findFirst({ where: { slug: ep.slug } });
  if (existing) {
    await prisma.contentVariant.deleteMany({ where: { contentId: existing.id } });
    await prisma.content.delete({ where: { id: existing.id } });
  }

  const bodyKu =
    ep.ku.body ??
    `${ep.ku.title}\n\nئەم ئەڵقەیە لە زنجیرەی «${SERIES_KU}»دا بڵاوکراوەتەوە. گوێگرتن لە ڕێگەی ڤیدیۆ یان دەنگ.`;
  const bodyEn =
    ep.en.body ??
    `${ep.en.title}\n\nThis episode is part of the «${SERIES_KU}» series. Stream via video or audio.`;

  const assets: Array<{
    kind: string;
    url: string;
    mimeType: string;
    meta: Record<string, unknown>;
  }> = [];

  if (ep.youtubeId) {
    assets.push({
      kind: "video",
      url: `https://www.youtube.com/watch?v=${ep.youtubeId}`,
      mimeType: "text/html",
      meta: {
        provider: "youtube",
        youtubeId: ep.youtubeId,
        embedUrl: `https://www.youtube.com/embed/${ep.youtubeId}`,
      },
    });
  }

  if (ep.videoUrl) {
    assets.push({
      kind: "video",
      url: ep.videoUrl,
      mimeType: "video/mp4",
      meta: { format: "mp4", provider: "file" },
    });
  }

  if (ep.audioUrl) {
    assets.push({
      kind: "audio",
      url: ep.audioUrl,
      mimeType: "audio/mpeg",
      meta: { format: "mp3" },
    });
  }

  if (cover) {
    assets.push({
      kind: "cover",
      url: cover,
      mimeType: cover.endsWith(".svg") ? "image/svg+xml" : "image/jpeg",
      meta: { alt: ep.ku.title },
    });
  }

  await prisma.content.create({
    data: {
      slug: ep.slug,
      type: "PODCAST",
      title: SERIES_KU,
      subtitle: ep.ku.title,
      coverImageUrl: cover,
      isPaid: false,
      seriesSlug: SERIES_SLUG,
      authorId,
      organizationId,
      publishedAt,
      variants: {
        create: [
          {
            locale: "ku",
            format: "AUDIO",
            status: "PUBLISHED",
            title: ep.ku.title,
            summary: SERIES_KU,
            body: bodyKu,
            publishedAt,
            durationSeconds: ep.durationSeconds ?? null,
            wordCount: bodyKu.split(/\s+/).filter(Boolean).length,
            assets: { create: assets },
          },
          {
            locale: "en",
            format: "AUDIO",
            status: "PUBLISHED",
            title: ep.en.title,
            summary: SERIES_EN,
            body: bodyEn,
            publishedAt,
            durationSeconds: ep.durationSeconds ?? null,
            wordCount: bodyEn.split(/\s+/).filter(Boolean).length,
            assets: {
              create: assets.filter((a) => a.kind !== "cover"),
            },
          },
        ],
      },
    },
  });

  console.log(`Upserted ${ep.slug} → series ${SERIES_SLUG}`);
}

async function main() {
  const author = await prisma.user.findUnique({
    where: { email: "editor@rudaw-demo.local" },
  });
  const org = await prisma.organization.findUnique({
    where: { slug: "rudaw-demo" },
  });
  if (!author || !org) {
    throw new Error("Run npm run db:seed first.");
  }

  for (const [i, ep] of episodes.entries()) {
    await upsertEpisode(ep, author.id, org.id, i);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
