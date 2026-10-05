import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imagesDir = join(
  process.cwd(),
  "../../apps/website/public/images/podcasts",
);

type Show = {
  slug: string;
  coverFile: string;
  colorA: string;
  colorB: string;
  mark: string;
  durationSeconds: number;
  ku: { title: string; summary: string; body: string };
  en: { title: string; summary: string; body: string };
};

const shows: Show[] = [
  {
    slug: "podcast-kurdistan-morning-brief",
    coverFile: "morning-brief.svg",
    colorA: "#1a1512",
    colorB: "#b22222",
    mark: "KB",
    durationSeconds: 600,
    ku: {
      title: "پوخته‌ی بەیانی کوردستان",
      summary: "١٠ خولەک لەسەر گرنگترین هەواڵەکانی ڕۆژ.",
      body: `لەم ئەڵقەیەدا باس لە هەواڵی ناوخۆ، ئابووری، و کولتوور دەکرێت بە شێوەیەکی خێرا و ڕوون.`,
    },
    en: {
      title: "Kurdistan Morning Brief",
      summary: "Ten minutes on the day’s top stories.",
      body: `This episode covers local news, the economy, and culture in a short, clear format.`,
    },
  },
  {
    slug: "podcast-mountain-voices",
    coverFile: "mountain-voices.svg",
    colorA: "#2c1810",
    colorB: "#8b5a2b",
    mark: "MV",
    durationSeconds: 1840,
    ku: {
      title: "دەنگەکانی شاخ",
      summary: "چیرۆک و گۆرانیی شاخ و گوندەکان.",
      body: `زنجیرەیەک لە دەنگبێژی و بیرەوەریی گوندەکانی کوردستان.`,
    },
    en: {
      title: "Mountain Voices",
      summary: "Stories and songs from the highlands.",
      body: `A series of dengbêj traditions and village memories from Kurdistan.`,
    },
  },
  {
    slug: "podcast-diaspora-desk",
    coverFile: "diaspora-desk.svg",
    colorA: "#0f1c2e",
    colorB: "#3d5a80",
    mark: "DD",
    durationSeconds: 2520,
    ku: {
      title: "مێزی دایاسپۆرا",
      summary: "گفتوگۆ لەگەڵ کوردانی دەرەوەی وڵات.",
      body: `هەڤپەیڤین لەگەڵ نووسەر، هونەرمەند، و چالاکوانانی کورد لە ئەوروپا و ئەمریکا.`,
    },
    en: {
      title: "Diaspora Desk",
      summary: "Conversations with Kurds abroad.",
      body: `Interviews with Kurdish writers, artists, and activists across Europe and North America.`,
    },
  },
  {
    slug: "podcast-culture-hour",
    coverFile: "culture-hour.svg",
    colorA: "#1f1410",
    colorB: "#c45c26",
    mark: "CH",
    durationSeconds: 3600,
    ku: {
      title: "کاتژمێری کولتوور",
      summary: "کتێب، فیلم، و هونەری کوردی.",
      body: `پێداچوونەوەی هەفتانە بۆ بڵاوکراوە و بۆنە کولتوورییەکان.`,
    },
    en: {
      title: "Culture Hour",
      summary: "Kurdish books, film, and art.",
      body: `A weekly look at publications, screenings, and cultural events.`,
    },
  },
  {
    slug: "podcast-politics-weekly",
    coverFile: "politics-weekly.svg",
    colorA: "#141414",
    colorB: "#b22222",
    mark: "PW",
    durationSeconds: 2700,
    ku: {
      title: "سیاسەتی هەفتانە",
      summary: "شیکاریی سیاسیی هەرێم و ناوچەکە.",
      body: `تێڕوانینێکی قووڵ بۆ گۆڕانکارییە سیاسییەکان لە کوردستان و ڕۆژهەڵاتی ناوەڕاست.`,
    },
    en: {
      title: "Politics Weekly",
      summary: "Regional politics, explained.",
      body: `Deep dives into political shifts across Kurdistan and the Middle East.`,
    },
  },
  {
    slug: "podcast-language-lab",
    coverFile: "language-lab.svg",
    colorA: "#102418",
    colorB: "#2d6a4f",
    mark: "LL",
    durationSeconds: 1200,
    ku: {
      title: "تاقیگەی زمان",
      summary: "فێربوونی سۆرانی و کرمانجی.",
      body: `ئەڵقە کورتەکان بۆ فێرخوازانی زمانی کوردی.`,
    },
    en: {
      title: "Language Lab",
      summary: "Learn Sorani and Kurmanji.",
      body: `Short episodes for Kurdish language learners.`,
    },
  },
];

function svgCover(s: Show) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${s.colorA}"/>
      <stop offset="100%" stop-color="${s.colorB}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <circle cx="640" cy="160" r="120" fill="rgba(255,255,255,0.08)"/>
  <circle cx="120" cy="680" r="180" fill="rgba(0,0,0,0.18)"/>
  <text x="80" y="420" font-family="Georgia, serif" font-size="120" font-weight="700" fill="#F9F6EE">${s.mark}</text>
  <text x="80" y="720" font-family="Georgia, serif" font-size="28" fill="rgba(249,246,238,0.7)">Oak KRD Podcast</text>
</svg>`;
}

async function main() {
  mkdirSync(imagesDir, { recursive: true });

  const author = await prisma.user.findUnique({
    where: { email: "editor@rudaw-demo.local" },
  });
  const org = await prisma.organization.findUnique({
    where: { slug: "rudaw-demo" },
  });
  if (!author || !org) {
    throw new Error("Run npm run db:seed first.");
  }

  for (const [i, show] of shows.entries()) {
    writeFileSync(join(imagesDir, show.coverFile), svgCover(show), "utf8");
    const cover = `/images/podcasts/${show.coverFile}`;
    const existing = await prisma.content.findFirst({ where: { slug: show.slug } });
    if (existing) {
      await prisma.contentVariant.deleteMany({ where: { contentId: existing.id } });
      await prisma.content.delete({ where: { id: existing.id } });
    }

    const publishedAt = new Date(Date.now() - i * 36e5);
    await prisma.content.create({
      data: {
        slug: show.slug,
        type: "PODCAST",
        title: show.ku.title,
        coverImageUrl: cover,
        isPaid: false,
        authorId: author.id,
        organizationId: org.id,
        publishedAt,
        variants: {
          create: [
            {
              locale: "ku",
              format: "AUDIO",
              status: "PUBLISHED",
              title: show.ku.title,
              summary: show.ku.summary,
              body: show.ku.body,
              durationSeconds: show.durationSeconds,
              publishedAt,
              wordCount: show.ku.body.split(/\s+/).filter(Boolean).length,
              assets: {
                create: [
                  {
                    kind: "cover",
                    url: cover,
                    mimeType: "image/svg+xml",
                    meta: { alt: show.en.title },
                  },
                ],
              },
            },
            {
              locale: "en",
              format: "AUDIO",
              status: "PUBLISHED",
              title: show.en.title,
              summary: show.en.summary,
              body: show.en.body,
              durationSeconds: show.durationSeconds,
              publishedAt,
              wordCount: show.en.body.split(/\s+/).filter(Boolean).length,
            },
          ],
        },
      },
    });
    console.log(`Upserted ${show.slug}`);
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
