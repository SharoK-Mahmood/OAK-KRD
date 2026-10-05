import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isNavSection } from "@oak-krd/shared";
import { ArticlesGallery } from "@/components/articles-gallery";
import { ArtGallery } from "@/components/art-gallery";
import { BooksStorefront } from "@/components/books-storefront";
import { NewsMagazine } from "@/components/news-magazine";
import { PodcastsStorefront } from "@/components/podcasts-storefront";
import { ContentList } from "@/components/content-list";
import { getSectionContents } from "@/lib/content-queries";

type Props = {
  params: Promise<{ locale: string; section: string }>;
};

export const revalidate = 60;

// generateStaticParams removed to avoid Next.js 15.5.x prerender-manifest
// race in dev (Unexpected end of JSON input). Sections resolve at request time.

export default async function SectionPage({ params }: Props) {
  const { locale, section: sectionParam } = await params;
  setRequestLocale(locale);

  if (!isNavSection(sectionParam)) {
    notFound();
  }

  const section = sectionParam;
  const t = await getTranslations("sections");

  let contents: Awaited<ReturnType<typeof getSectionContents>> = [];
  try {
    contents = await getSectionContents(section);
  } catch {
    contents = [];
  }

  if (section === "news") {
    const news = await getTranslations("newsShop");
    return (
      <NewsMagazine
        items={contents}
        locale={locale}
        labels={{
          recentlyAdded: news("recentlyAdded"),
          all: news("all"),
          trending: news("trending"),
          international: news("international"),
          politics: news("politics"),
          business: news("business"),
          empty: t("empty"),
          by: news("by"),
        }}
      />
    );
  }

  if (section === "articles") {
    const arts = await getTranslations("articlesShop");
    return (
      <ArticlesGallery
        articles={contents}
        locale={locale}
        labels={{
          exhibitions: arts("exhibitions"),
          latest: arts("latest"),
          latestSub: arts("latestSub"),
          viewMore: arts("viewMore"),
          showLess: arts("showLess"),
          empty: t("empty"),
          on: arts("on"),
        }}
      />
    );
  }

  if (section === "gallery") {
    const gal = await getTranslations("galleryShop");
    return (
      <ArtGallery
        items={contents}
        locale={locale}
        labels={{
          heroTitle: gal("heroTitle"),
          heroTagline: gal("heroTagline"),
          learnMore: gal("learnMore"),
          events: gal("events"),
          exhibitions: gal("exhibitions"),
          aboutTitle: gal("aboutTitle"),
          aboutBody: gal("aboutBody"),
          weekdays: gal("weekdays"),
          weekends: gal("weekends"),
          hoursWeek: gal("hoursWeek"),
          hoursWeekend: gal("hoursWeekend"),
          buyTickets: gal("buyTickets"),
          worksTitle: gal("worksTitle"),
          seeAll: gal("seeAll"),
          pricesTitle: gal("pricesTitle"),
          paintings: gal("paintings"),
          graphic: gal("graphic"),
          sculptures: gal("sculptures"),
          testimonials: gal("testimonials"),
          empty: t("empty"),
        }}
      />
    );
  }

  if (section === "books") {
    const shop = await getTranslations("booksShop");
    return (
      <BooksStorefront
        books={contents}
        locale={locale}
        labels={{
          newArrivals: shop("newArrivals"),
          books: shop("books"),
          ebooks: shop("ebooks"),
          audio: shop("audio"),
          by: shop("by"),
          empty: t("empty"),
        }}
      />
    );
  }

  if (section === "podcasts") {
    const cast = await getTranslations("podcastsShop");
    return (
      <PodcastsStorefront
        podcasts={contents}
        locale={locale}
        labels={{
          discover: cast("discover"),
          library: cast("library"),
          charts: cast("charts"),
          newReleases: cast("newReleases"),
          featured: cast("featured"),
          topCharts: cast("topCharts"),
          thisWeek: cast("thisWeek"),
          thisMonth: cast("thisMonth"),
          empty: t("empty"),
          episodes: cast("episodes"),
          episode: cast("episode"),
        }}
      />
    );
  }

  return (
    <section className="oak-container py-8 sm:py-10">
      <div className="border-b border-oak-ink pb-4">
        <p className="kicker">{t(`${section}.nav`)}</p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,5vw,3rem)] font-medium text-oak-ink">
          {t(`${section}.title`)}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-oak-stone sm:mt-3 sm:text-base">
          {t(`${section}.description`)}
        </p>
      </div>
      <ContentList
        contents={contents}
        locale={locale}
        emptyMessage={t("empty")}
      />
    </section>
  );
}
