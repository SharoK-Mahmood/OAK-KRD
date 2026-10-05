import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "kurdish-kilim-tapestry-fine-print";
const COVER = "/images/gallery/kurdish-kilim-tapestry-room.webp";
const GALLERY = [
  {
    url: "/images/gallery/kurdish-kilim-tapestry-room.webp",
    kind: "cover",
    alt: "Kurdish Kilim Tapestry Fine Print — framed on wall with vase",
  },
  {
    url: "/images/gallery/kurdish-kilim-tapestry-held.webp",
    kind: "gallery",
    alt: "Kurdish Kilim Tapestry Fine Print — held in living room",
  },
] as const;

const ART_META = {
  format: "Museum-quality fine art print (unframed)",
  publisher: "Oak KRD Gallery",
  medium: "Archival pigment print",
  size: '16" × 20" (41 × 51 cm)',
};

const kuTitle = "چاپی هونەریی کێلیمی کوردی";
const kuSubtitle =
  "فەرشی کێلیم · نەخشی کوردستان · پۆستەری دیکۆر · Kurdish Kilim Tapestry Fine Print";
const kuSummary =
  "چاپی وردی کێلیمێکی کوردی بە نەخشی ئەڵماس و ڕەنگی سوور، نارنجی، ڕەش و سپی — لە شوێنێکی بەردی نەریتی لەگەڵ کورسی و بالشت.";
const kuBody = `چاپی هونەریی کێلیمی کوردی — نەخشی کوردستان · پۆستەری دیکۆر · Kurdistan Motif Decor Poster

ئەم چاپە وێنەیەکی وردی کێلیمێکی دەستبافت پیشان دەدات کە لەسەر دیواری بەردی نەریتی هەڵواسراوە. نەخشەکە ئەڵماسی خولگەییە بە ڕەنگی سوور، نارنجی/زەرد، ڕەش و کرێم؛ لە خوارەوە فرینجی ئەستوور.

دەوروبەر: سەقفی دار و کا، کورسییەکی نزم لەگەڵ بالشتی نەخشین، سەبەتەی فووچ و تەندووری ئاگر — دیمەنی ماڵێکی کوردیی نەریتی.

فۆرمات: چاپی هونەری کوالیتی بەرز (بەبێ چوارچێوە)
قەبارە: ١٦" × ٢٠" (٤١ × ٥١ سم)
ماددە: چاپی پیگمێنتی ئەرشیفی

گونجاو بۆ دیواری ماڵ و ئۆفیس — دیکۆری کولتووری کورد.

Oak KRD Gallery · Demo listing.`;

const enTitle = "Kurdish Kilim Tapestry Fine Print";
const enSubtitle =
  "Kurdistan Motif Decor Poster · Traditional kilim · Wall art";
const enSummary =
  "A fine art print of a bold geometric Kurdish kilim — nested diamonds in red, orange, black, and cream — hung on a rustic stone wall with traditional seating.";
const enBody = `Kurdish Kilim Tapestry Fine Print – Kurdistan Motif Decor Poster

This print captures a handwoven Kurdish kilim hanging on a rough-hewn stone wall under wooden beams and thatch. The tapestry’s nested diamond motif runs in deep red, orange-yellow, black, and cream, with a thick cream fringe along the bottom.

Below: a low wooden bench with patterned pillows, woven baskets, a metal fire bowl with kindling, and a corner of another richly patterned rug on stone pavers — a quiet scene of traditional Kurdistan home decor.

Format: Museum-quality fine art print (unframed)
Size: 16" × 20" (41 × 51 cm)
Medium: Archival pigment print

Warm, heritage wall decor for living rooms, studios, and cultural spaces. Frame photos are for display inspiration; frames sold separately.

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
      priceCents: 3800,
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
