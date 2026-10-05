import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "kurdistan-map-poster-basem-joko";
const COVER = "/images/gallery/kurdistan-map-poster-gold.webp";
const GALLERY = [
  {
    url: "/images/gallery/kurdistan-map-poster-gold.webp",
    kind: "cover",
    alt: "Kurdistan Poster — gold frame, patterned map collage",
  },
  {
    url: "/images/gallery/kurdistan-map-poster-sunlit.webp",
    kind: "gallery",
    alt: "Kurdistan Poster — light wood frame in sunlit room",
  },
] as const;

const ART_META = {
  author: "Basem Joko",
  format: "Museum-quality art print (unframed)",
  publisher: "Oak KRD Gallery",
  medium: "Archival pigment print",
  size: '18" × 24" (46 × 61 cm)',
};

const kuTitle = "پۆستەری کوردستان";
const kuSubtitle =
  "نەخشەی کوردستان · هونەری نەریتی · کولتووری کورد · Basem Joko · Kurdistan Wall Decor";
const kuSummary =
  "چاپی هونەریی نەخشەی کوردستان لە کۆلاژی فەرشی نەریتی، هەناری سوور، خۆری زێڕین، و کۆتر — کاری باسم جۆکۆ.";
const kuBody = `پۆستەری کوردستان — نەخشەی کوردی · هونەری نەریتی · کولتووری کورد · دیواری ڕازاندنەوە · Kurdish · Kurdistan

هونەرمەند: باسم جۆکۆ (Basem Joko)

ئەم چاپە سیلوێتی نەخشەی کوردستان پڕ دەکات لە نەخشی فەرشی کوردی — سوور، شین، زێڕ، و گوڵ. لە ناوەڕاستدا خۆرێکی زێڕین بە تیشکەکانیەوە دەردەکەوێت (هێمای ئاڵای کوردستان). لە لای چەپ هەناری سوور؛ لە سەرەوە کۆترەیەکی سپی لە فڕیندا.

وشەی «KURDISTAN» بە فۆنتی سێریف و ڕەنگی زێڕین لە خوارەوە نووسراوە.

فۆرمات: چاپی هونەری کوالیتی بەرز (بەبێ چوارچێوە)
قەبارە: ١٨" × ٢٤" (٤٦ × ٦١ سم)
ماددە: چاپی پیگمێنتی ئەرشیفی

گونجاو بۆ دیواری ماڵ، ئۆفیس، یان پێشانگا — هدیەیەکی کولتووری بۆ ئەو کەسانەی حەزیان لە کوردستان هەیە.

وێنەکان چوارچێوەی زێڕین و دارین پیشان دەدەن بۆ ئیلهام؛ چوارچێوە جیا دەفرۆشرێت.

Oak KRD Gallery · Demo listing.`;

const enTitle = "Kurdistan Poster";
const enSubtitle =
  "Kurdish Map · Traditional Art · Kurdish Culture · Wall Decor · by Basem Joko";
const enSummary =
  "A collage map of Kurdistan filled with traditional textile patterns, pomegranates, a golden sun, and a dove — artwork by Basem Joko.";
const enBody = `Kurdistan Poster – Kurdish Map, Traditional Art, Kurdish Culture, Wall Decor, Kurdish, Kurdistan, Kurdish

Artist: Basem Joko

This print fills a silhouette of Kurdistan with traditional Kurdish rug and textile patterns — red, blue, gold, and floral motifs. A golden sun with radiating rays sits at the heart of the map, echoing the Kurdish flag. Red pomegranates appear on the left; a white dove flies above.

The word “KURDISTAN” is set in a bold serif, golden type at the bottom of the cream ground.

Format: Museum-quality art print (unframed)
Size: 18" × 24" (46 × 61 cm)
Medium: Archival pigment print

Ideal as Kurdistan wall decor for homes, offices, or cultural spaces.

Room photos show gold and light-wood frames for inspiration; frames sold separately.

Oak KRD Gallery · Demo listing.`;

async function main() {
  const author = await prisma.user.findUnique({
    where: { email: "books@naris-press.local" },
  });
  const org = await prisma.organization.findUnique({
    where: { slug: "naris-press" },
  });

  if (!author || !org) {
    throw new Error("Run npm run db:seed first so naris-press publisher exists.");
  }

  const existing = await prisma.content.findFirst({ where: { slug: SLUG } });
  if (existing) {
    await prisma.contentVariant.deleteMany({ where: { contentId: existing.id } });
    await prisma.content.delete({ where: { id: existing.id } });
  }

  const now = new Date();
  const content = await prisma.content.create({
    data: {
      slug: SLUG,
      type: "GALLERY",
      title: kuTitle,
      subtitle: kuSubtitle,
      coverImageUrl: COVER,
      isPaid: true,
      priceCents: 4200,
      currency: "USD",
      authorId: author.id,
      organizationId: org.id,
      publishedAt: now,
      variants: {
        create: [
          {
            locale: "ku",
            format: "TEXT",
            status: "PUBLISHED",
            title: kuTitle,
            summary: kuSummary,
            body: kuBody,
            publishedAt: now,
            wordCount: kuBody.split(/\s+/).filter(Boolean).length,
            assets: {
              create: GALLERY.map((item) => ({
                kind: item.kind,
                url: item.url,
                mimeType: "image/webp",
                meta: {
                  alt: item.alt,
                  ...ART_META,
                },
              })),
            },
          },
          {
            locale: "en",
            format: "TEXT",
            status: "PUBLISHED",
            title: enTitle,
            summary: enSummary,
            body: enBody,
            publishedAt: now,
            wordCount: enBody.split(/\s+/).filter(Boolean).length,
          },
        ],
      },
    },
  });

  console.log(`Added gallery work: ${content.slug}`);
  console.log(`KU: /ku/c/${content.slug}`);
  console.log(`EN: /en/c/${content.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
