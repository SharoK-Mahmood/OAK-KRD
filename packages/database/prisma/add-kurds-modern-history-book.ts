import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "the-kurds-a-modern-history";
const COVER = "/images/kurds-modern-history-cover.jpg";
const GALLERY = [
  {
    url: COVER,
    kind: "cover",
    alt: "Cover — The Kurds: A Modern History by Michael M. Gunter",
  },
] as const;

const BOOK_META = {
  author: "Michael M. Gunter",
  publisher: "Markus Wiener Publishers",
  format: "Hardcover",
  rating: "4.2 / 5 (12 reviews)",
};

const kuTitle = "کوردەکان: مێژوویەکی مۆدێرن";
const kuSubtitle = "مایکڵ م. گانتەر · The Kurds: A Modern History";
const kuSummary =
  "پێداچوونەوەیەکی مێژوویی و جوگرافیی ڕۆڵی کورد لە سەرەتای سەدەی بیستەمەوە تا ناکۆکییەکانی ئەمڕۆ لەگەڵ داعش و حکومەتە هەرێمییەکان — لەلایەن مایکڵ م. گانتەر.";
const kuBody = `کوردەکان متمانەپێکراوترین هاوپەیمانانی ئەمریکان لە شەڕی دژی داعش لە سووریا و عێراق — لە ناوچەیەکدا کە ئەکتەرەکانی دیکە بەرژەوەندی و وەلائیان دەگۆڕدرێت. مایکڵ گانتەر پێداچوونەوەیەکی کاتی پێشکەش دەکات و ڕۆڵی کورد لە چوارچێوەی مێژوویی و جوگرافیدا دادەنێت.

کوردستان لەسەر سنوورە شاخاوییەکان درێژ دەبێتەوە کە تورکیا، ئێران، عێراق، و سووریا تێکدەکەون. ٣٠ ملیۆن یان زیاتر کورد بەناوبانگترین نەتەوەی جیهانن کە دەوڵەتی سەربەخۆی خۆیان نییە. خواستی زۆرێک لە کورد بۆ سەربەخۆیی، یان لانیکەم خۆبەڕێوەبەریی کولتووری و سیاسی، بووەتە هۆی زنجیرەیەکی نزیکەی بەردەوامی راپەڕینی کوردی لە دوای دروستکردنی سیستەمی دەوڵەتی مۆدێرنی ڕۆژهەڵاتی ناوەڕاست بە ڕێککەوتننامەی سایکس–پیکۆ لە جەنگی جیهانی یەکەمدا — کە کوردی بەبێ دەوڵەتی خۆی جێهێشت.

ئەو دەوڵەتانەی کە کورد تێیاندا دەژین، لە لای خۆیانەوە دەترسن داواکارییە کوردییەکان یەکپارچەیی خاکیان هەڕەشە لێبکات. ئەم کتێبە ئەزموونی کورد لە سەرەتای سەدەی بیستەمەوە تا ناکۆکییەکانی ئەمڕۆ لەگەڵ داعش و حکومەتە هەرێمییەکان تۆمار دەکات.

گانتەر، بە پشتبەستن بە زیاتر لە ٣٠ ساڵ توێژینەوە لەسەر کوردستان، گەشتی زۆر بۆ ناوچەکە، و گفتوگۆ لەگەڵ زۆرێک لە کەسایەتییە بەرچاوە کوردەکان، مێژوویەکی تەواو، بەڵگەدار، و خوێندنەوەی ئاسان لەسەر کورد نووسیوە.

فۆرمات: Hardcover · نووسەر: مایکڵ م. گانتەر · هەڵسەنگاندن: ٤٫٢ لە ٥ (١٢ پێداچوونەوە)`;

const enTitle = "The Kurds: A Modern History";
const enSubtitle = "by Michael M. Gunter · Hardcover";
const enSummary =
  "A thorough, well-documented history of the Kurds from the early 20th century to today’s conflicts with ISIS and regional governments — by Michael M. Gunter.";
const enBody = `The Kurds are America's most reliable allies in the fight against ISIS in Syria and Iraq, in a region whose other actors have shifting interests and loyalties. Michael Gunter provides a timely overview and places the Kurds' role in its historical and geographical context.

Kurdistan straddles the mountainous borders where Turkey, Iran, Iraq, and Syria converge. The 30 million or more Kurds famously constitute the largest nation in the world without its own independent state. The desire of many Kurds for independence, or at least cultural and political autonomy, has led to an almost continuous series of Kurdish revolts since the creation of the modern Middle Eastern state system by the Sykes-Picot Agreement during World War I left the Kurds without their own state.

The states inhabited by Kurds, for their part, fear that Kurdish demands will threaten their territorial integrity. This book chronicles the Kurdish experience from the early 20th century to today's conflicts with ISIS and the regional governments.

Calling upon more than 30 years of scholarship on Kurdistan, numerous trips to the region, and discussions with many leading Kurdish figures, Michael Gunter has written a thorough, well-documented, and highly readable history of the Kurds.

Format: Hardcover · Author: Michael M. Gunter · Rating: 4.2 out of 5 stars (12 reviews)`;

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
      type: "BOOK",
      title: kuTitle,
      subtitle: kuSubtitle,
      coverImageUrl: COVER,
      isPaid: true,
      priceCents: 2895,
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
                mimeType: "image/jpeg",
                meta: {
                  alt: item.alt,
                  ...BOOK_META,
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

  console.log(`Added book: ${content.slug}`);
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
