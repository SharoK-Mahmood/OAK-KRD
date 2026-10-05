import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "mem-u-zin";
const COVER = "/images/mem-u-zin-cover.jpg";
const GALLERY = [
  {
    url: "/images/mem-u-zin-cover.jpg",
    kind: "cover",
    alt: "Front cover — Mem û Zîn by Ehmedê Xanî",
  },
  {
    url: "/images/mem-u-zin-back.jpg",
    kind: "gallery",
    alt: "Back cover — Mem û Zîn",
  },
] as const;

const BOOK_META = {
  author: "Ehmedê Xanî",
  isbnPaperback: "978-3-932574-28-3",
  publisher: "Institute of Kurdish Studies Berlin",
  translator: "Feryad Fazil Omar & Mitch Cohen",
  format: "Paperback",
};

const kuTitle = "مەم و زین";
const kuSubtitle =
  "ئەحمەدێ خانی · وەرگێڕانی فەریاد فازڵ عومەر و میتچ کۆھن · Mem û Zîn";
const kuSummary =
  "ئەپیسی نیشتمانیی کورد — چیرۆکی خۆشەویستی مەم و زین، نووسراو لە سەدەی حەڤدەهەمدا لەلایەن ئەحمەدێ خانییەوە بە کرمانجی؛ خۆشەویستی، خیانت، و چارەنووس.";
const kuBody = `«مەم و زین» دەقێکی بنەڕەتیی ئەدەبی کوردییە. چیرۆکەکە بە ئەگەری زۆر لە دەوروبەری ساڵی ١٤٥٠ سەری هەڵداوە و لە نەوەکاندا لەلایەن دەنگبێژانەوە گواستراوەتەوە. لە سەدەی حەڤدەهەمدا ئەحمەدێ خانی (١٦٥٠–١٧٠٧)، زانا، عارف، و شاعیری کورد — کە بە دامەزرێنەری نەتەوەخوازیی کوردی دادەنرێت — نووسیویەتییەوە. خانی مەترسیی نووسین بە کرمانجی هەڵبژارد، نەک عەرەبی یان فارسی.

مەم و زین باسی خۆشەویستییەکی تراژیدی دەکات کە لەسەر ڕووداوێکی ڕاستەقینە دامەزراوە. مەم گەنجێکی هەستیارە لە تیرەی ئالان و میراتگری شاری ڕۆژئاوا — شاعیر و ڕاستگۆ. زین کچی والی جزیرە بۆتان (جزیرەی ئەمڕۆ)ە و بە جوانیی فریشتەیی وەسف دەکرێت. لە جێژنێکی نەورۆزدا یەکتر دەبینن و عاشق دەبن. هەردووکیان نوێنەرایەتی چاکە و دادپەروەری دەکەن.

بەکۆی تیرەی بەکران، نوێنەری خراپە و فێڵ، بە حەسوودی بۆ دوو عاشقەکە، بە پلانی ئاڵۆز خۆشەویستییان بۆ میر ئاشکرا دەکات و مەم دەخرێتە زیندان. تاجدین، هاوڕێی نزیکی مەم، هەوڵی ئازادکردنی دەدات بەڵام سەرناکەوێت.

مەم لە زیندان دەمرێت. زین هەواڵەکە دەبیستێت و دوای حەوت ڕۆژ لە خەم دەمرێت. هەردووکیان لە جزیرە لە تەنیشت یەکتر دەنێژرێن.

ڕۆڵی بەکۆ ئاشکرا دەبێت و تاجدین دەیکوژێت. بەکۆ لە تەنیشت مەم و زین دەنێژرێت، چونکە مەم پێش مردن وتبووی: «بەهۆی بەکۆوە نەمانتوانی پێکەوە بین، دەمەوێت شایەتی خۆشەویستییەکەمان بێت. ئەگەر مرد، لە تەنیشت من و زین بینێژن.»

بەڵام گوڵەسوورێکی دڕکاوی لە گۆڕی بەکۆ دەڕوێت. ڕەگە خرابەکانی — بە خوێنی خۆی خۆراک دەکرێن — دەچنە نێوان گۆڕەکانی دوو عاشقەکە و تەنانەت لە مردنیشدا جیايان دەکاتەوە.

لە پاشخانەی ئەم تراژیدیایەدا، ئەپیکە باسی موعجیزە و سەرکێشییەکان دەکات: ئەسپی جادوویی، پەرییەکان، نەریتە کۆمەڵایەتییەکان، و بابەتی ڕۆمانسی و ئەخلاقی.

زۆرێک لە کورد پەیوەندییەکی قووڵیان بەم ئەپیکەوە هەیە، چونکە یەکێک بوو لە یەکەمین بەرهەمە گرنگەکانی ئەدەب کە نزیکەی تەواو بە کوردی نووسرابوو؛ هەروەها وەک ئەلیگۆریای خەباتی نەتەوەیی بۆ دەوڵەت دەبینرێت.

گۆرانی، فیلم، و چیرۆکی زۆر لەسەر مەم و زین دروستکراون. سەرەڕای گرنگییەکەی، بۆ ماوەیەکی درێژ بڵاونەکرایەوە چونکە هیچ دەوڵەتێک ڕێگەی نەدەدا. بۆ نموونە لە ١٨٩٨ گۆڤاری «کوردستان» لە قاهیرە بڵاوی کردەوە، بەڵام دەسەڵاتدارانی عوسمانی گۆڤارەکەیان داخست.

لە ساڵانی ١٩٢٠ەوە چەند وەشان و وەرگێڕان بڵاوکراونەتەوە. لە ١٩٩٢ ئومیت ئەلچی فیلمێکی لێ دروستکرد — لەو کاتەدا زمانی کوردی لە تورکیا قەدەغە بوو، بۆیە فیلمەکە بە تورکی بڵاوکرایەوە. لە ٢٠٢١ جومعە بۆینوکارا داوای نمایشی شانۆیەکی لەسەر مەم و زینی لە شانۆی شارەوانی ئیستەنبوڵ کرد؛ سەرەتا قبوڵ کرا، بەڵام لە پرۆگرام دانەنرا و هیچ ڕوونکردنەوەیەک نەدرا.

ناشر: ئینستیتیوتی خوێندنی کوردی بەرلین · وەرگێڕ: فەریاد فازڵ عومەر و میتچ کۆھن · ISBN: 978-3-932574-28-3`;

const enTitle = "Mem û Zîn";
const enSubtitle =
  "by Ehmedê Xanî · translated by Feryad Fazil Omar & Mitch Cohen · مەم و زین";
const enSummary =
  "The Kurdish national epic — a tragic love story written down in the 17th century by Ehmedê Xanî in Kurmancî; love, betrayal, fate, and an allegory of a nation’s longing.";
const enBody = `“Mem û Zîn,” the Kurdish epic Mem and Zin, is a foundational text of Kurdish literature. An epic tale, it likely originated around 1450 and was handed down over the generations by dengbêj, or traditional speech-singing. The tale was written down in the seventeenth century by Ehmedê Xanî (1650–1707), a Kurdish intellectual, scholar, mystic and poet who is considered the founder of Kurdish nationalism. Xanî took the risk of writing in Kurmancî rather than Arabic or Persian.

Mem û Zîn tells the tragic love story of two star-crossed lovers, based on a real-life episode. Mem is a sensitive Kurdish youth of the Alan clan and heir to the City of the West; he is said to be poetic and honest. Zin is the daughter of the governor of Jazira Botan (modern Cizre) and is said to be angelically beautiful. They meet during a Newroz celebration and fall in love. The two of them represent righteousness and goodness.

Beko of the Bakran clan, who represents evil and mischief, is jealous of the two lovers. Using a complicated scheme, he reveals their love to the prince, who imprisons Mem. Tacdîn, Mem’s best friend, rallies his friends to try to free him, but they are thwarted.

Mem dies in prison. Zin hears the news and perishes from grief seven days later. The two star-crossed lovers are buried next to each other in Cizre.

Beko’s role in the tragedy is exposed, and Tacdîn kills him. Beko is buried next to Mem and Zîn because before he died, Mem said, “It was because of Beko that we could not come together, so I want him to witness our love. If he dies, bury him next to me and Zîn.”

But a thorny rosebush grows from Beko’s grave. Nourished by his blood, its malicious roots penetrate between the lovers’ graves, separating them even in death.

Against this tragic backdrop, the epic recounts many tales of miracles and adventures. Mem receives a magical horse. Fairies bring the two lovers together. The social conventions of the era are also described, and romantic and moral topics are discussed.

Many Kurds feel a deep connection to the epic because it was one of the first significant pieces of literature to be written almost entirely in Kurdish. Also, the subject matter is seen as an allegory for the Kurdish nation’s quest for statehood.

Many songs, movies, and stories have been based on Mem û Zîn. Despite the epic’s significance, it long went unpublished since no state would permit it. For example, in 1898 the Cairo-based Kurdish magazine Kurdistan published it, but Ottoman authorities subsequently shut the magazine down.

Several versions and translations of the epic have been published since the 1920s. In 1992 Ümit Elçi directed a film version. At that time the Kurdish language was prohibited in Turkey, so the film had to be released in Turkish.

In 2021 Cuma Boynukara, the author of a play based on Mem û Zîn, applied to the Istanbul municipal theater administration to stage it in Turkish. (It had been performed in Istanbul in 2002.) The administration initially accepted the request, but the play was not included in the city theater’s program. No explanation was given, and the general director was removed from his duty. No one in the administration has answered Boynukara’s questions about the fate of the play.

Love, betrayal, and fate — this is the story the epic tells so poignantly that it has taken the rank of the national epic of the Kurds. As the poet exhorts: “So make quite sure that love’s the residence of truth, / The guideline leading close to God and to perfection.” (verse 2486)

Publisher: Institute of Kurdish Studies Berlin · Translators: Feryad Fazil Omar & Mitch Cohen · ISBN: 978-3-932574-28-3 · A Classic Kurdish Epic from the 17th Century`;

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
      priceCents: 2200,
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
