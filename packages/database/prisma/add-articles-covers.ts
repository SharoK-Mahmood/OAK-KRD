import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const imagesDir = join(
  process.cwd(),
  "../../apps/website/public/images/articles",
);

type Article = {
  slug: string;
  coverFile: string;
  colorA: string;
  colorB: string;
  mark: string;
  authorEmail: string;
  orgSlug: string;
  daysAgo: number;
  ku: { title: string; summary: string; body: string };
  en: { title: string; summary: string; body: string };
};

const articles: Article[] = [
  {
    slug: "kurdish-language-in-digital-age",
    coverFile: "digital-language.svg",
    colorA: "#1a1512",
    colorB: "#b22222",
    mark: "KU",
    authorEmail: "editor@rudaw-demo.local",
    orgSlug: "rudaw-demo",
    daysAgo: 1,
    ku: {
      title: "زمانی کوردی لە سەردەمی دیجیتاڵدا: هەل و ئاستەنگ",
      summary:
        "چۆن ئەپ و پلاتفۆڕمەکان دەتوانن یارمەتی پاراستن و پەرەپێدانی زمانی کوردی بدەن.",
      body: `زمانی کوردی لەسەر ئینتەرنێت زیاتر دەرکەوتووە، بەڵام هێشتا کێشەی فۆنت، کیبۆرد، و نەبوونی ناوەڕۆکی ستاندارد هەیە.

پێویستە دامەزراوەکان و بڵاوکەرەوەکان هاوکاری بکەن بۆ دروستکردنی فەرهەنگ، وەرگێڕان، و ناوەڕۆکی پەروەردەیی بە کوردی.`,
    },
    en: {
      title: "Kurdish language in the digital age: openings and obstacles",
      summary:
        "How apps and platforms can help preserve and grow Kurdish online.",
      body: `Kurdish is more visible online than a decade ago, yet fonts, keyboards, and a shortage of standardized content remain challenges.

Institutions and publishers need to collaborate on dictionaries, translations, and educational material in Kurdish.`,
    },
  },
  {
    slug: "women-entrepreneurs-erbil",
    coverFile: "women-erbil.svg",
    colorA: "#2a1810",
    colorB: "#c45c26",
    mark: "WE",
    authorEmail: "desk@kurdistan24-demo.local",
    orgSlug: "k24-demo",
    daysAgo: 4,
    ku: {
      title: "چیرۆکی ژنانێک کە بازرگانێتی بچووک لە هەولێر دەستپێدەکەن",
      summary:
        "لە کافێ و دیزاینی جلوبەرگەوە تا تەکنەلۆژیا؛ چۆن پشتگیری دارایی یارمەتی دەدات.",
      body: `لە هەولێر ژمارەیەک لە ژنان پڕۆژەی بچووکی بازرگانی دەستپێکردووە، لەوانە کافێ، دیزاینی جلوبەرگ، و خزمەتگوزاری دیجیتاڵ.`,
    },
    en: {
      title: "Women building small businesses in Erbil",
      summary:
        "From cafés and fashion design to tech services — how micro-support helps.",
      body: `Across Erbil, women are launching small ventures in cafés, fashion, and digital services.`,
    },
  },
  {
    slug: "climate-and-kurdistan-mountains",
    coverFile: "climate-mountains.svg",
    colorA: "#102418",
    colorB: "#2d6a4f",
    mark: "CM",
    authorEmail: "editor@rudaw-demo.local",
    orgSlug: "rudaw-demo",
    daysAgo: 5,
    ku: {
      title: "گۆڕانی کەشوهەوا و کاریگەری لەسەر شاخەکانی کوردستان",
      summary: "کەمبوونەوەی بەفر، وشکەساڵی، و پێویستی پلانی پاراستنی ژینگە.",
      body: `شارەزایانی ژینگە هۆشداری دەدەن کە کەمبوونەوەی بەفر لە زستاندا کاریگەری لەسەر سەرچاوەی ئاو و کشتوکاڵ لە هاویندا هەیە.`,
    },
    en: {
      title: "Climate change and Kurdistan’s mountains",
      summary:
        "Less snowfall, drought risk, and the need for environmental planning.",
      body: `Environmental specialists warn that reduced winter snowfall affects summer water supply and agriculture.`,
    },
  },
  {
    slug: "article-archives-suleymani",
    coverFile: "archives.svg",
    colorA: "#1c1410",
    colorB: "#6b4423",
    mark: "AR",
    authorEmail: "books@naris-press.local",
    orgSlug: "naris-press",
    daysAgo: 2,
    ku: {
      title: "ئەرشیڤە ونبووەکانی سلێمانی",
      summary: "گەڕانێک بەدوای دەستنووس و وێنەی کۆن لە کۆگاکانی شار.",
      body: `لە سلێمانی کۆگای تایبەت هەیە کە دەستنووس، وێنە، و نامەی کۆن پارێزراون. پاراستنیان پێویستی بە دیجیتاڵکردن و کتێبخانەی گشتی هەیە.`,
    },
    en: {
      title: "Sulaymaniyah’s missing archives",
      summary: "A search through manuscripts and old photographs in the city’s vaults.",
      body: `Sulaymaniyah holds private collections of manuscripts, photographs, and letters. Digitization and public libraries are essential to preserve them.`,
    },
  },
  {
    slug: "article-newroz-fires",
    coverFile: "newroz.svg",
    colorA: "#2a1008",
    colorB: "#b22222",
    mark: "NR",
    authorEmail: "editor@rudaw-demo.local",
    orgSlug: "rudaw-demo",
    daysAgo: 8,
    ku: {
      title: "ئاگرەکانی نەورۆز: لە سیمبوولەوە بۆ یادەوەریی گشتی",
      summary: "چۆن جێژنی نەورۆز لە شار و گونددا شێوە دەگۆڕێت.",
      body: `نەورۆز تەنها ئاگرێک نییە؛ یادەوەرییەکی گشتی و کولتورییە کە لە شار و گونددا بە شێوەی جیاواز دەردەکەوێت.`,
    },
    en: {
      title: "Newroz fires: from symbol to public memory",
      summary: "How the festival takes different shapes in cities and villages.",
      body: `Newroz is more than a fire — it is public memory and culture, expressed differently across cities and villages.`,
    },
  },
  {
    slug: "article-hawler-citadel-walk",
    coverFile: "citadel.svg",
    colorA: "#0f1c2e",
    colorB: "#4a5568",
    mark: "HC",
    authorEmail: "desk@kurdistan24-demo.local",
    orgSlug: "k24-demo",
    daysAgo: 3,
    ku: {
      title: "پیاسەیەک لەسەر قەڵای هەولێر",
      summary: "مێژوو، نۆژەنکردنەوە، و ژیانی ڕۆژانە لە دەوروبەری قەڵا.",
      body: `قەڵای هەولێر شوێنێکی نیشتمانی و گەشتیارییە. نۆژەنکردنەوە و پاراستنی شوێنەوار پێویستی بە هەماهەنگی شارەوانی و دانیشتووان هەیە.`,
    },
    en: {
      title: "A walk on Erbil’s citadel",
      summary: "History, restoration, and daily life around the mound.",
      body: `Erbil’s citadel is a national and tourism landmark. Restoration needs coordination between the municipality and residents.`,
    },
  },
];

function svgCover(a: Article) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a.colorA}"/>
      <stop offset="100%" stop-color="${a.colorB}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <rect x="60" y="60" width="680" height="880" fill="none" stroke="rgba(249,246,238,0.25)" stroke-width="2"/>
  <text x="100" y="520" font-family="Georgia, serif" font-size="110" font-weight="700" fill="#F9F6EE">${a.mark}</text>
  <text x="100" y="900" font-family="Georgia, serif" font-size="26" fill="rgba(249,246,238,0.65)">Oak KRD · Article</text>
</svg>`;
}

async function main() {
  mkdirSync(imagesDir, { recursive: true });

  for (const article of articles) {
    writeFileSync(join(imagesDir, article.coverFile), svgCover(article), "utf8");
    const cover = `/images/articles/${article.coverFile}`;
    const author = await prisma.user.findUnique({
      where: { email: article.authorEmail },
    });
    const org = await prisma.organization.findUnique({
      where: { slug: article.orgSlug },
    });
    if (!author || !org) {
      throw new Error(`Missing publisher for ${article.slug}`);
    }

    const existing = await prisma.content.findFirst({
      where: { slug: article.slug },
    });
    if (existing) {
      await prisma.contentVariant.deleteMany({
        where: { contentId: existing.id },
      });
      await prisma.content.delete({ where: { id: existing.id } });
    }

    const publishedAt = new Date(
      Date.now() - article.daysAgo * 24 * 60 * 60 * 1000,
    );
    await prisma.content.create({
      data: {
        slug: article.slug,
        type: "ARTICLE",
        title: article.ku.title,
        coverImageUrl: cover,
        isPaid: false,
        authorId: author.id,
        organizationId: org.id,
        publishedAt,
        variants: {
          create: [
            {
              locale: "ku",
              format: "TEXT",
              status: "PUBLISHED",
              title: article.ku.title,
              summary: article.ku.summary,
              body: article.ku.body,
              publishedAt,
              wordCount: article.ku.body.split(/\s+/).filter(Boolean).length,
            },
            {
              locale: "en",
              format: "TEXT",
              status: "PUBLISHED",
              title: article.en.title,
              summary: article.en.summary,
              body: article.en.body,
              publishedAt,
              wordCount: article.en.body.split(/\s+/).filter(Boolean).length,
            },
          ],
        },
      },
    });
    console.log(`Upserted ${article.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
