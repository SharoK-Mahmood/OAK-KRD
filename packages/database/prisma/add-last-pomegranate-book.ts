import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "the-last-pomegranate-tree";
const COVER = "/images/last-pomegranate-cover.png";
const GALLERY = [
  {
    url: "/images/last-pomegranate-cover.png",
    kind: "cover",
    alt: "Front cover — The Last Pomegranate Tree",
  },
  {
    url: "/images/last-pomegranate-back.webp",
    kind: "gallery",
    alt: "Back cover with reviews — The Last Pomegranate Tree",
  },
  {
    url: "/images/last-pomegranate-interior.webp",
    kind: "gallery",
    alt: "Interior pages — The Last Pomegranate Tree",
  },
] as const;

const BOOK_META = {
  author: "Bachtyar Ali",
  isbnPaperback: "978-1-953861-40-5",
  isbnEbook: "978-1-953861-41-2",
  publisher: "Archipelago Books",
  published: "January 24, 2023",
  translator: "Kareem Abdulrahman",
  format: "Paperback",
};

const kuTitle = "دواھەمین ھەناری دونیا";
const kuSubtitle = "بەختیار عەلی · وەرگێڕانی کەریم عەبدولڕەحمان · The Last Pomegranate Tree";
const kuSummary =
  "ڕۆمانێکی بەختیار عەلی، وەرگێڕدراو لە کوردیی سۆرانییەوە بۆ ئینگلیزی لەلایەن کەریم عەبدولڕەحمان؛ چیرۆکێکی خولگەیی لە نێوان خەون و واقیع، شۆڕش و بێهیوایی، و درەختی هەنار وەک پردی نێوان دوو جیهان.";
const kuBody = `بەختیار عەلی، لە ساڵی ١٩٦٠ لە سلێمانی لەدایکبووە، لە زانکۆی سلێمانی و دواتر لە هەولێر زانستی زەوی خوێندووە. دوای برینداربوون لە خۆپیشاندانێک دژی ڕژێمی بەعس، سەرنجی بۆ ئەدەب گۆڕا و بوو بە ڕۆماننووس، ڕەخنەگر، وتارنووس و شاعیر. لە ناوەڕاستی نەوەدەکانەوە لە ئەڵمانیا دەژی. ڕۆمانی «من سەیری شەوی شارم کرد» بە یەکەمین ڕۆمانی کوردی دادەنرێت کە بە ئینگلیزی بڵاوکراوەتەوە (٢٠١٧).

«دواھەمین ھەناری دونیا» لە ساڵی ٢٠٠٢ نووسراوە و لە ٢٤ی کانوونی دووەمی ٢٠٢٣ بە ئینگلیزی لە چاپەمەنی Archipelago Books بڵاوکراوەتەوە. وەرگێڕانی کەریم عەبدولڕەحمانە.

چیرۆکەکە بە دوو گێڕانەوەی جیاواز دەست پێدەکات. ناسنامەکان دەگۆڕێن: موزەفەر و یەعقووب جیاوازن، هەندێکجار وەک دوو نیوەی یەک دەردەکەون. خوشکێکی نەناسراو، سێ گەنجی بەناوی ساریاس («مرۆڤ»)، و کوڕێک بە ناوی محەممەدی دڵیشیشە، لە جیهانێکی خەونئامێزدا دەجووڵێن کە لە ڕیالیزمی جادوویی نزیکە — بەڵام لێرە خەون و واقیع دوو قۆناغی کۆسمۆلۆژین کە درەختی هەنار پێکەوەیان دەبەستێتەوە.

تێمای سەرەکی بێهیوایی لە شۆڕشە: سیاسەت و بیابان یەکن — «هەردووکیان خاکن کە هیچ شتێکیان تێدا ناڕوێ.» دوای جەنگ و شۆڕش، موزەفەر و یەعقووب لە کوڕەکانیان دەبڕێن و بەتاڵ دەمێننەوە. پرسیار ئەوەیە: چەندە خۆت لە جیهانی گەندەڵ داببڕیت؟ عەلی هەڵبژاردەی ڤۆلتێر دەکات: باخەکەی خۆی بپارێزێت.

ناشر: Archipelago Books · وەرگێڕ: کەریم عەبدولڕەحمان · ISBN چاپ: 978-1-953861-40-5 · ISBN ئەلیکترۆنی: 978-1-953861-41-2`;

const enTitle = "The Last Pomegranate Tree";
const enSubtitle = "by Bachtyar Ali · translated from Kurdish by Kareem Abdulrahman · دواھەمین ھەناری دونیا";
const enSummary =
  "Bachtyar Ali’s novel, translated from Kurdish (Sorani) by Kareem Abdulrahman — a looping, dream-tinged story of war, revolution, fluid identity, and the pomegranate tree that joins two realms.";
const enBody = `Bachtyar Ali, born in 1960 in Silêmanî, studied geology at the University of Silêmanî and later in Hêwler. During a protest against the Ba’ath regime, he was injured and thereafter shifted his interest to literature. Over time he became a novelist, critic, essayist, and poet. He has lived in Germany since the mid-1990s. His novel I Stared at the Night of the City is said to be the first Kurdish-language novel published in English translation, in 2017.

The Last Pomegranate Tree, written in 2002, was published in English in January 2023 by Archipelago Books. Bachtyar Ali writes in Sorani. Translated from the Kurdish by Kareem Abdulrahman.

Some readers find the novel disorienting at first: it begins with two different stories told by two different narrators. Sorani storytelling can sound more suggestive and metaphorical than concrete to Anglophone ears. Identities shift — Muzafar and Yaqub are distinct, even opposites, yet sometimes seem to merge; elsewhere we meet two indistinguishable sisters; three youths all bear the name Saryas, meaning “human,” and sometimes stand for an entire people devastated by war and revolution under Saddam Hussein.

The story is not linear — it loops backward and forward, in circles or a spiral. The novel’s world resembles magical realism, mixing dreams and reality, except that here dreams and reality also exist in two cosmological realms joined by the pomegranate tree. Characters have heightened powers: Muzafar’s twenty-one years in the desert; sisters who sing ethereally all night; the boy Muhammad, with a heart of glass, who shatters into dust when he dies.

A grand theme is disappointment with revolution. “The desert and politics are the same,” Ali writes, “—they are both lands where nothing grows.” War and revolution cut Muzafar and Yaqub from their infant sons. Given that society is corrupt, Ali makes the Voltairean choice to tend to his own garden.

Discussed at Book Club on January 2, 2023.

Publisher: Archipelago Books · Translator: Kareem Abdulrahman · Paperback ISBN: 978-1-953861-40-5 · Ebook ISBN: 978-1-953861-41-2 · List price: $18 US`;

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
      priceCents: 1800,
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
  console.log(`Books: /ku/browse/books`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
