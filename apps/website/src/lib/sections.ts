import type { ContentType, NavSection } from "@oak-krd/shared";
import type { Prisma } from "@oak-krd/database";

export type SectionFilter = {
  slug: NavSection;
  /** Prisma where clause for published content in this section */
  where: Prisma.ContentWhereInput;
};

const published: Prisma.ContentWhereInput = {
  publishedAt: { not: null },
};

export const SECTION_FILTERS: Record<NavSection, SectionFilter> = {
  news: {
    slug: "news",
    where: { ...published, type: "NEWS" },
  },
  articles: {
    slug: "articles",
    where: { ...published, type: "ARTICLE" },
  },
  gallery: {
    slug: "gallery",
    where: { ...published, type: "GALLERY" },
  },
  books: {
    slug: "books",
    where: { ...published, type: { in: ["BOOK", "EBOOK"] satisfies ContentType[] } },
  },
  audiobooks: {
    slug: "audiobooks",
    where: { ...published, type: "AUDIOBOOK" },
  },
  research: {
    slug: "research",
    where: { ...published, type: "RESEARCH" },
  },
  podcasts: {
    slug: "podcasts",
    where: { ...published, type: "PODCAST" },
  },
  video: {
    slug: "video",
    where: {
      ...published,
      variants: { some: { format: "VIDEO", status: "PUBLISHED" } },
    },
  },
  translations: {
    slug: "translations",
    where: {
      ...published,
      // Works that exist in more than one language
      AND: [
        { variants: { some: { status: "PUBLISHED", locale: "ku" } } },
        {
          OR: [
            { variants: { some: { status: "PUBLISHED", locale: "ar" } } },
            { variants: { some: { status: "PUBLISHED", locale: "en" } } },
          ],
        },
      ],
    },
  },
};
