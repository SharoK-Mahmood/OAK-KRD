import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { prisma } from "@oak-krd/database";
import { LOCALE_LABELS, type Locale } from "@oak-krd/shared";
import { MediaGallery } from "@/components/media-gallery";
import { PurchasePanel } from "@/components/purchase-panel";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const GALLERY_KINDS = new Set(["cover", "gallery", "thumbnail"]);

function isAuthorAsset(meta: unknown) {
  return (meta as { role?: string } | null)?.role === "author";
}

function formatDate(value: Date | null, locale: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ku" ? "en-GB" : locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(value);
  } catch {
    return "";
  }
}

export default async function ContentPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const content = await prisma.content.findFirst({
    where: {
      slug,
      publishedAt: { not: null },
    },
    include: {
      variants: {
        where: {
          status: "PUBLISHED",
          format: { in: ["TEXT", "AUDIO"] },
        },
        orderBy: { createdAt: "asc" },
        include: {
          assets: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
      author: { select: { name: true, image: true, bio: true } },
      organization: { select: { name: true, slug: true } },
    },
  });

  if (!content || content.variants.length === 0) {
    notFound();
  }

  const preferredFormat = content.type === "PODCAST" ? "AUDIO" : "TEXT";
  const variant =
    content.variants.find(
      (v) => v.locale === locale && v.format === preferredFormat,
    ) ??
    content.variants.find((v) => v.format === preferredFormat) ??
    content.variants.find((v) => v.locale === locale) ??
    content.variants[0];

  const youtubeAsset =
    variant.assets.find((a) => {
      const meta = a.meta as { youtubeId?: string } | null;
      return meta?.youtubeId || /youtube|youtu\.be/.test(a.url);
    }) ??
    content.variants
      .flatMap((v) => v.assets)
      .find((a) => {
        const meta = a.meta as { youtubeId?: string } | null;
        return meta?.youtubeId || /youtube|youtu\.be/.test(a.url);
      });
  const youtubeId =
    (youtubeAsset?.meta as { youtubeId?: string } | null)?.youtubeId ??
    youtubeAsset?.url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|embed\/)([\w-]{11})/,
    )?.[1] ??
    null;

  const allAssets = [
    ...variant.assets,
    ...content.variants.flatMap((v) => v.assets),
  ];

  const authorFromAsset = allAssets.find((a) => isAuthorAsset(a.meta));
  const authorPhoto =
    content.author?.image ||
    authorFromAsset?.url ||
    null;

  const galleryAssets = allAssets.filter(
    (asset, index, all) =>
      GALLERY_KINDS.has(asset.kind) &&
      !isAuthorAsset(asset.meta) &&
      all.findIndex((a) => a.url === asset.url) === index,
  );

  const galleryImages =
    galleryAssets.length > 0
      ? galleryAssets.map((asset, i) => ({
          src: asset.url,
          alt:
            (asset.meta as { alt?: string } | null)?.alt ??
            `${variant.title} — ${i + 1}`,
        }))
      : content.coverImageUrl
        ? [{ src: content.coverImageUrl, alt: variant.title }]
        : [];

  const isBookish = ["BOOK", "EBOOK", "AUDIOBOOK", "GALLERY"].includes(
    content.type,
  );
  const showPurchase = content.isPaid && content.priceCents != null;
  const showAuthorByline = !isBookish && Boolean(content.author?.name);

  const byLabel =
    locale === "ku" ? "لەلایەن" : locale === "ar" ? "بقلم" : "by";
  const aboutAuthor =
    locale === "ku"
      ? "دەربارەی نووسەر"
      : locale === "ar"
        ? "عن الكاتب"
        : "About the author";

  const purchaseDetails: { label: string; value: string }[] = [];
  if (isBookish) {
    const meta = galleryAssets
      .map((a) => a.meta as Record<string, string> | null)
      .find((m) => m && (m.isbnPaperback || m.publisher || m.author));

    const labels =
      locale === "ku"
        ? {
            author: "نووسەر",
            translator: "وەرگێڕ",
            format: "فۆرمات",
            publisher: "بڵاوکەرەوە",
            published: "بەروار",
            isbnP: "ISBN (چاپ)",
            isbnE: "ISBN (ئەلیکترۆنی)",
          }
        : locale === "ar"
          ? {
              author: "المؤلف",
              translator: "المترجم",
              format: "الصيغة",
              publisher: "الناشر",
              published: "التاريخ",
              isbnP: "ISBN (ورقي)",
              isbnE: "ISBN (إلكتروني)",
            }
          : {
              author: "Author",
              translator: "Translator",
              format: "Format",
              publisher: "Publisher",
              published: "Published",
              isbnP: "ISBN (paperback)",
              isbnE: "ISBN (ebook)",
            };

    if (meta?.author) purchaseDetails.push({ label: labels.author, value: meta.author });
    if (meta?.translator)
      purchaseDetails.push({ label: labels.translator, value: meta.translator });
    if (meta?.format) purchaseDetails.push({ label: labels.format, value: meta.format });
    if (meta?.publisher)
      purchaseDetails.push({ label: labels.publisher, value: meta.publisher });
    if (meta?.published)
      purchaseDetails.push({ label: labels.published, value: meta.published });
    if (meta?.isbnPaperback)
      purchaseDetails.push({ label: labels.isbnP, value: meta.isbnPaperback });
    if (meta?.isbnEbook)
      purchaseDetails.push({ label: labels.isbnE, value: meta.isbnEbook });
    const sizeLabel =
      locale === "ku" ? "قەبارە" : locale === "ar" ? "الحجم" : "Size";
    const mediumLabel =
      locale === "ku" ? "ماددە" : locale === "ar" ? "الوسط" : "Medium";
    if (meta?.size) purchaseDetails.push({ label: sizeLabel, value: meta.size });
    if (meta?.medium)
      purchaseDetails.push({ label: mediumLabel, value: meta.medium });
  }

  return (
    <article
      className={`oak-container py-8 sm:py-10 ${
        isBookish ? "max-w-5xl" : "max-w-3xl"
      }`}
    >
      <p className="kicker">
        {content.type}
        {content.organization ? ` · ${content.organization.name}` : null}
      </p>
      <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,3rem)] font-medium leading-tight text-oak-ink">
        {content.type === "PODCAST" ? content.title : variant.title}
      </h1>
      {content.type === "PODCAST" && variant.title !== content.title ? (
        <p className="mt-2 font-serif text-lg text-oak-stone sm:text-xl">
          {variant.title}
        </p>
      ) : null}
      {content.subtitle && !showAuthorByline && content.type !== "PODCAST" ? (
        <p className="mt-2 font-serif text-lg text-oak-stone sm:text-xl">
          {content.subtitle}
        </p>
      ) : null}

      {showAuthorByline ? (
        <div className="mt-5 flex items-center gap-3 border-y border-oak-rule py-4">
          {authorPhoto ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-oak-sand ring-1 ring-oak-rule sm:h-16 sm:w-16">
              <Image
                src={authorPhoto}
                alt={content.author!.name ?? "Author"}
                fill
                className="object-cover object-top"
                sizes="64px"
              />
            </div>
          ) : (
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oak-ink text-sm font-bold text-oak-bone sm:h-16 sm:w-16"
              aria-hidden
            >
              {(content.author!.name ?? "A")
                .split(/\s+/)
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-oak-ink sm:text-base">
              <span className="font-normal text-oak-stone">{byLabel} </span>
              {content.author!.name}
            </p>
            {content.publishedAt ? (
              <p className="mt-0.5 text-xs text-oak-stone sm:text-sm">
                {formatDate(content.publishedAt, locale)}
                {content.organization ? ` · ${content.organization.name}` : ""}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {content.variants.length > 1 ? (
        <p className="mt-4 text-xs text-oak-stone">
          Available in:{" "}
          {content.variants
            .map((v) => LOCALE_LABELS[v.locale as Locale] ?? v.locale)
            .join(" · ")}
        </p>
      ) : null}

      {isBookish && galleryImages.length > 0 ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <MediaGallery images={galleryImages} />
          <div className="space-y-6">
            {showPurchase ? (
              <PurchasePanel
                title={variant.title}
                priceCents={content.priceCents!}
                currency={content.currency}
                locale={locale}
                details={purchaseDetails}
              />
            ) : null}
            {variant.summary ? (
              <p className="text-base leading-relaxed text-oak-stone sm:text-lg">
                {variant.summary}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          {galleryImages.length === 1 ? (
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden bg-oak-sand sm:mt-8">
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : galleryImages.length > 1 ? (
            <div className="mt-6 sm:mt-8">
              <MediaGallery
                images={galleryImages}
                className="aspect-auto [&_.relative]:aspect-[16/10]"
              />
            </div>
          ) : null}

          {youtubeId ? (
            <div className="relative mt-6 aspect-video w-full overflow-hidden bg-oak-ink sm:mt-8">
              <iframe
                title={variant.title}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          {variant.summary ? (
            <p className="mt-5 text-base leading-relaxed text-oak-stone sm:mt-6 sm:text-lg">
              {variant.summary}
            </p>
          ) : null}

          {showPurchase ? (
            <div className="mt-6 max-w-md">
              <PurchasePanel
                title={variant.title}
                priceCents={content.priceCents!}
                currency={content.currency}
                locale={locale}
                details={purchaseDetails}
              />
            </div>
          ) : null}
        </>
      )}

      <div className="article-body mt-6 whitespace-pre-wrap text-oak-ink sm:mt-8">
        {variant.body}
      </div>

      {showAuthorByline && (content.author?.bio || authorPhoto) ? (
        <aside className="mt-10 flex gap-4 border-t border-oak-rule pt-8 sm:gap-5">
          {authorPhoto ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-oak-sand ring-1 ring-oak-rule sm:h-24 sm:w-24">
              <Image
                src={authorPhoto}
                alt={content.author!.name ?? "Author"}
                fill
                className="object-cover object-top"
                sizes="96px"
              />
            </div>
          ) : null}
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-oak-fire">
              {aboutAuthor}
            </p>
            <p className="mt-1 font-display text-xl font-medium text-oak-ink">
              {content.author!.name}
            </p>
            {content.author?.bio ? (
              <p className="mt-2 text-sm leading-relaxed text-oak-stone">
                {content.author.bio}
              </p>
            ) : null}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
