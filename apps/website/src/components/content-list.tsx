import { Link } from "@/i18n/navigation";
import {
  CONTENT_TYPE_LABELS,
  LOCALE_LABELS,
  type ContentType,
  type Locale,
} from "@oak-krd/shared";

export type ContentListItem = {
  id: string;
  slug: string;
  title: string;
  type: string;
  coverImageUrl?: string | null;
  author: { name: string | null } | null;
  organization: { name: string; slug: string } | null;
  variants: {
    locale: string;
    format: string;
    title: string;
    summary: string | null;
  }[];
};

type Props = {
  contents: ContentListItem[];
  locale: string;
  emptyMessage: string;
};

export function ContentList({ contents, locale, emptyMessage }: Props) {
  if (contents.length === 0) {
    return <p className="mt-8 text-sm text-oak-stone sm:mt-10">{emptyMessage}</p>;
  }

  return (
    <ul className="mt-6 divide-y divide-oak-rule border-y border-oak-rule sm:mt-8">
      {contents.map((content) => {
        const preferred =
          content.variants.find((v) => v.locale === locale) ?? content.variants[0];

        return (
          <li key={content.id} className="py-4 sm:py-5">
            <Link href={`/c/${content.slug}`} className="group block min-w-0">
              {content.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.coverImageUrl}
                  alt=""
                  className="mb-3 aspect-[16/9] w-full max-w-xl object-cover"
                />
              ) : null}
              <p className="kicker">
                {CONTENT_TYPE_LABELS[content.type as ContentType] ?? content.type}
                {content.organization ? ` · ${content.organization.name}` : null}
              </p>
              <h2 className="mt-2 font-display text-xl font-medium leading-snug text-oak-ink group-hover:text-oak-fire sm:text-2xl md:text-3xl">
                {preferred?.title ?? content.title}
              </h2>
              {preferred?.summary ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-oak-stone line-clamp-3 sm:line-clamp-none">
                  {preferred.summary}
                </p>
              ) : null}
              <p className="mt-2 text-[11px] uppercase tracking-wider text-oak-stone sm:text-xs">
                {content.author?.name ? `${content.author.name} · ` : ""}
                {content.variants
                  .map((v) => LOCALE_LABELS[v.locale as Locale] ?? v.locale)
                  .join(" · ")}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
