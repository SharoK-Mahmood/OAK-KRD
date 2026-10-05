import { unstable_cache } from "next/cache";
import { prisma } from "@oak-krd/database";
import type { NavSection } from "@oak-krd/shared";
import { SECTION_FILTERS } from "./sections";

const listSelect = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  type: true,
  coverImageUrl: true,
  isPaid: true,
  priceCents: true,
  currency: true,
  publishedAt: true,
  seriesSlug: true,
  variants: {
    where: { status: "PUBLISHED" as const },
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
  author: { select: { name: true, image: true } },
  organization: { select: { name: true, slug: true } },
} as const;

async function fetchHomeContents() {
  return prisma.content.findMany({
    where: { publishedAt: { not: null } },
    select: listSelect,
    orderBy: { publishedAt: "desc" },
    take: 12,
  });
}

async function fetchSectionContents(section: NavSection) {
  if (section === "translations") {
    const contents = await prisma.content.findMany({
      where: { publishedAt: { not: null } },
      select: {
        ...listSelect,
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
        },
      },
      orderBy: { publishedAt: "desc" },
      take: 100,
    });
    return contents.filter(
      (c) => new Set(c.variants.map((v) => v.locale)).size >= 2,
    );
  }

  // Books storefront also surfaces audiobooks in its Audio tab
  if (section === "books") {
    return prisma.content.findMany({
      where: {
        publishedAt: { not: null },
        type: { in: ["BOOK", "EBOOK", "AUDIOBOOK"] },
      },
      select: listSelect,
      orderBy: { publishedAt: "desc" },
      take: 50,
    });
  }

  return prisma.content.findMany({
    where: SECTION_FILTERS[section].where,
    select: listSelect,
    orderBy: { publishedAt: "desc" },
    take: 50,
  });
}

/** Cached loaders — avoid hitting Postgres on every language/tab click. */
export const getHomeContents = unstable_cache(fetchHomeContents, ["home-contents"], {
  revalidate: 10,
  tags: ["contents"],
});

export function getSectionContents(section: NavSection) {
  return unstable_cache(
    () => fetchSectionContents(section),
    [`section-contents-${section}`],
    { revalidate: 10, tags: ["contents", `section-${section}`] },
  )();
}
