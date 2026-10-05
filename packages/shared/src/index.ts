export const LOCALES = ["ku", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ku";

export const CONTENT_TYPES = [
  "NEWS",
  "ARTICLE",
  "BOOK",
  "EBOOK",
  "AUDIOBOOK",
  "PRESS_RELEASE",
  "REPORT",
  "RESEARCH",
  "PODCAST",
  "GALLERY",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_FORMATS = [
  "TEXT",
  "PDF",
  "EPUB",
  "AUDIO",
  "VIDEO",
  "SUMMARY",
] as const;
export type ContentFormat = (typeof CONTENT_FORMATS)[number];

export const CONTENT_STATUSES = [
  "DRAFT",
  "REVIEW",
  "PUBLISHED",
  "ARCHIVED",
] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const USER_ROLES = ["READER", "PUBLISHER", "ADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Free vs paid content categories for product rules */
export const FREE_CONTENT_TYPES: ContentType[] = [
  "NEWS",
  "ARTICLE",
  "PRESS_RELEASE",
  "REPORT",
  "RESEARCH",
  "PODCAST",
  "GALLERY",
];

export const PAID_CONTENT_TYPES: ContentType[] = [
  "BOOK",
  "EBOOK",
  "AUDIOBOOK",
];

export function isPaidContentType(type: ContentType): boolean {
  return (PAID_CONTENT_TYPES as readonly string[]).includes(type);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  ku: "کوردی",
  ar: "العربية",
  en: "English",
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  NEWS: "News",
  ARTICLE: "Article",
  BOOK: "Book",
  EBOOK: "E-book",
  AUDIOBOOK: "Audiobook",
  PRESS_RELEASE: "Press release",
  REPORT: "Report",
  RESEARCH: "Research",
  PODCAST: "Podcast",
  GALLERY: "Gallery",
};

/** Main navigation content tabs */
export const NAV_SECTIONS = [
  "news",
  "articles",
  "gallery",
  "books",
  "audiobooks",
  "research",
  "podcasts",
  "video",
  "translations",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

export function isNavSection(value: string): value is NavSection {
  return (NAV_SECTIONS as readonly string[]).includes(value);
}
