import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CONTENT_TYPE_LABELS,
  type ContentType,
} from "@oak-krd/shared";
import { getHomeContents } from "@/lib/content-queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

type HomeItem = Awaited<ReturnType<typeof getHomeContents>>[number];

function pickVariant(item: HomeItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const brand = await getTranslations("brand");

  let contents: HomeItem[] = [];
  try {
    contents = await getHomeContents();
  } catch {
    contents = [];
  }

  const featured = contents[0];
  const hotNow = contents.slice(1, 6);
  const more = contents.slice(6, 12);
  const featuredVariant = featured ? pickVariant(featured, locale) : null;

  return (
    <>
      <section className="relative border-b border-oak-rule bg-[#1a1512] text-oak-bone">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-oak-fire/30 via-transparent to-black/70 opacity-90"
        />

        <div className="oak-container relative grid gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="min-w-0 lg:col-span-7">
            <p className="font-brand text-[clamp(2rem,7vw,3rem)] leading-none text-white">
              {brand("name")}
            </p>
            <p className="mt-2 max-w-md text-[11px] uppercase leading-relaxed tracking-[0.16em] text-oak-bone/70 sm:text-sm sm:tracking-[0.2em]">
              {brand("tagline")}
            </p>

            {featured && featuredVariant ? (
              <div className="mt-8 sm:mt-10">
                <span className="badge-hot">{t("hotNow")}</span>
                {featured.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.coverImageUrl}
                    alt=""
                    className="mt-4 aspect-[16/9] w-full max-w-xl object-cover opacity-95"
                  />
                ) : null}
                <h1 className="mt-3 font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium leading-[1.2] text-white sm:mt-4">
                  <Link href={`/c/${featured.slug}`} className="hover:underline">
                    {featuredVariant.title}
                  </Link>
                </h1>
                {featuredVariant.summary ? (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-oak-bone/80 sm:mt-4 sm:text-base">
                    {featuredVariant.summary}
                  </p>
                ) : null}
                <p className="mt-3 text-[11px] uppercase tracking-wider text-oak-bone/55 sm:mt-4 sm:text-xs">
                  {CONTENT_TYPE_LABELS[featured.type as ContentType] ?? featured.type}
                  {featured.author?.name ? ` · ${featured.author.name}` : ""}
                </p>
              </div>
            ) : (
              <div className="mt-8 sm:mt-10">
                <span className="badge-hot">{t("hotNow")}</span>
                <h1 className="mt-3 font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium leading-[1.2] text-white sm:mt-4">
                  {t("headline")}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-oak-bone/80 sm:mt-4 sm:text-base">
                  {t("subhead")}
                </p>
                <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center bg-oak-fire px-5 py-3 text-center text-sm font-semibold text-white hover:bg-oak-fire-dark"
                  >
                    {t("ctaPrimary")}
                  </Link>
                  <Link
                    href="/browse/news"
                    className="inline-flex items-center justify-center border border-oak-bone/40 px-5 py-3 text-center text-sm font-semibold text-oak-bone hover:border-white hover:text-white"
                  >
                    {t("ctaSecondary")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <aside className="min-w-0 border-t border-oak-bone/20 pt-6 sm:pt-8 lg:col-span-5 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-oak-fire sm:text-xs">
              {t("breaking")}
            </p>
            <ul className="mt-4 divide-y divide-oak-bone/15 sm:mt-5">
              {(hotNow.length > 0 ? hotNow : [1, 2, 3, 4, 5].map((n) => ({ placeholder: n }))).map(
                (item) => {
                  if ("placeholder" in item) {
                    return (
                      <li key={item.placeholder} className="py-3 first:pt-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                          {t("comingSoon")}
                        </p>
                        <p className="mt-1 font-display text-base leading-snug text-oak-bone/50 sm:text-lg">
                          {t("placeholderItem", { n: item.placeholder })}
                        </p>
                      </li>
                    );
                  }

                  const v = pickVariant(item, locale);
                  return (
                    <li key={item.id} className="py-3 first:pt-0">
                      <Link href={`/c/${item.slug}`} className="group block">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-oak-fire">
                          {CONTENT_TYPE_LABELS[item.type as ContentType] ?? item.type}
                        </p>
                        <p className="mt-1 font-display text-base leading-snug text-white group-hover:underline sm:text-lg">
                          {v?.title ?? item.title}
                        </p>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </aside>
        </div>
      </section>

      <section className="oak-container py-8 sm:py-12">
        <div className="mb-6 flex items-end justify-between gap-3 border-b border-oak-ink pb-3 sm:mb-8">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl">{t("latest")}</h2>
          <Link
            href="/browse/news"
            className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-oak-fire hover:text-oak-fire-dark sm:text-xs"
          >
            {t("viewAll")}
          </Link>
        </div>

        {more.length > 0 || contents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {(more.length > 0 ? more : contents.slice(0, 6)).map((item) => {
              const v = pickVariant(item, locale);
              return (
                <article key={item.id} className="border-b border-oak-rule pb-5 sm:pb-6">
                  {item.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.coverImageUrl}
                      alt=""
                      className="mb-3 aspect-[16/9] w-full object-cover"
                    />
                  ) : null}
                  <p className="kicker">
                    {CONTENT_TYPE_LABELS[item.type as ContentType] ?? item.type}
                  </p>
                  <h3 className="mt-2 font-display text-lg leading-snug sm:text-xl">
                    <Link href={`/c/${item.slug}`} className="hover:text-oak-fire">
                      {v?.title ?? item.title}
                    </Link>
                  </h3>
                  {v?.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-oak-stone">
                      {v.summary}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-oak-stone">{t("emptyFeed")}</p>
        )}
      </section>
    </>
  );
}
