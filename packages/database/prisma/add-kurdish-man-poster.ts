import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "kurdish-man-poster-wall-art";
const COVER = "/images/gallery/kurdish-man-poster-gold-frame.png";
const GALLERY = [
  {
    url: "/images/gallery/kurdish-man-poster-gold-frame.png",
    kind: "cover",
    alt: "Kurdish Man Poster — gold frame, room setting",
  },
  {
    url: "/images/gallery/kurdish-man-poster-room.webp",
    kind: "gallery",
    alt: "Kurdish Man Poster — light wood frame in interior",
  },
  {
    url: "/images/gallery/kurdish-man-poster-mat.png",
    kind: "gallery",
    alt: "Kurdish Man Poster — matted gold frame detail",
  },
] as const;

const ART_META = {
  format: "Museum-quality art print (unframed)",
  publisher: "Oak KRD Gallery",
  medium: "Archival pigment print",
  size: '24" × 36" (61 × 91 cm)',
};

const kuTitle = "پۆستەری پیاوێکی کورد";
const kuSubtitle =
  "هونەری دیواری کوردستان · چاپی هونەری کوردی · ڕازاندنەوەی کولتووری کورد · Kurdish Man Poster";
const kuSummary =
  "چاپێکی کۆلاژی نەریتی کە پۆرترێتێکی پیاوێکی کورد لەگەڵ فەرشی ڕەنگاوڕەنگ، کالیگرافی، و ئاسمانی شین و کۆترەکان تێکەڵ دەکات — گونجاو بۆ دیواری ماڵ و ئۆفیس.";
const kuBody = `پۆستەری پیاوێکی کورد — هونەری دیواری کوردستان · چاپی هونەری کوردی · ڕازاندنەوەی کولتووری کورد · Kurdish Wall Art

ئەم چاپە کۆلاژییە پۆرترێتێکی وردی پیاوێکی بەتەمەن پیشان دەدات بە جلوبەرگی نەریتی کورد — جەمە، پۆشاکی قاوەیی، و کەفییە سور و سپی. دەستەکانی لە نزیک ڕووخسارەکەیە، وەک لە بیرکردنەوە یان نوێژ. 

لای چەپ: فەرشی کوردستانی/فارسی بە نەخشی گül و ڕەنگی سوور و شین؛ بەشێکی کالیگرافیی کوردی/عەرەبی لەسەر کاغەزی کۆن.

لای ڕاست: ئاسمانی شین لەگەڵ هەور و دوو کۆترەی سپی — هێمای ئاشتی و ئازادی.

فۆرمات: چاپی هونەری کوالیتی بەرز (بەبێ چوارچێوە)
قەبارە: ٢٤" × ٣٦" (٦١ × ٩١ سم)
ماددە: چاپی پیگمێnti ئەرشیفی

گونجاو بۆ دیواری ماڵ، ئۆفیس، یان کافێ — هدیەیەکی بەنرخ بۆ ئەو کەسانەی حەزیان لە کولتووری کورد هەیە.

Oak KRD Gallery · Demo listing for the Art & Gallery section.`;

const enTitle = "Kurdish Man Poster";
const enSubtitle =
  "Kurdistan Wall Art · Traditional Kurdish Art Print · Kurdish Culture Decor · Kurdish Wall Art";
const enSummary =
  "A traditional collage-style art print: an elderly Kurdish man in classic dress, woven rug motifs, calligraphy, and a sky with doves — ideal culture decor for home or office.";
const enBody = `Kurdish Man Poster – Kurdistan Wall Art – Traditional Kurdish Art Print – Kurdish Culture Decor – Kurdish Wall Art

This collage-style print centers on a detailed portrait of an elderly Kurdish man in traditional dress: a red-and-white keffiyeh, brown coat, and patterned sash. His hands are clasped near his face in a moment of quiet reflection.

Left panel: ornate Kurdish/Persian rug patterns in red, blue, and cream, with sections of Kurdish/Arabic calligraphy on aged paper.

Right panel: a blue sky with textured clouds and two white doves in flight — symbols of peace and hope.

Format: Museum-quality art print (unframed)
Size: 24" × 36" (61 × 91 cm)
Medium: Archival pigment print

Perfect as Kurdish wall art for living rooms, offices, or cultural spaces, and as a gift for anyone who loves Kurdistan and its heritage.

Photos show the print in gold and light-wood frame settings for display inspiration; frames sold separately.

Oak KRD Gallery · Demo listing for the Art & Gallery section.`;

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
      priceCents: 4900,
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
                mimeType: item.url.endsWith(".webp")
                  ? "image/webp"
                  : "image/png",
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
  console.log(`Gallery: /ku/browse/gallery`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
