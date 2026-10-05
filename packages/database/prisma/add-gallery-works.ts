import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const imagesDir = join(
  process.cwd(),
  "../../apps/website/public/images/gallery",
);

type Work = {
  slug: string;
  coverFile: string;
  colorA: string;
  colorB: string;
  accent: string;
  mark: string;
  priceCents: number;
  ku: { title: string; summary: string; body: string };
  en: { title: string; summary: string; body: string };
};

const works: Work[] = [
  {
    slug: "gallery-zagros-light",
    coverFile: "zagros-light.svg",
    colorA: "#0d3b3e",
    colorB: "#b87333",
    accent: "#f9f6ee",
    mark: "ZL",
    priceCents: 9500,
    ku: {
      title: "ڕووناکیی زاگرۆس",
      summary: "تابلۆیەکی ئەبستراکت لەسەر دیمەنی شاخ و خۆرئاوا.",
      body: `ئەم کارە ڕەنگەکانی کانزا و سەوزایی شاخەکان تێکەڵ دەکات — ئیلهام لە زنجیرەی زاگرۆس.`,
    },
    en: {
      title: "Zagros Light",
      summary: "An abstract canvas of mountain ridges and dusk.",
      body: `This work blends mineral tones and highland greens — inspired by the Zagros range.`,
    },
  },
  {
    slug: "gallery-erbil-alleys",
    coverFile: "erbil-alleys.svg",
    colorA: "#1a1512",
    colorB: "#8b1a1a",
    accent: "#efebe0",
    mark: "EA",
    priceCents: 12000,
    ku: {
      title: "گەڕەکەکانی هەولێر",
      summary: "وێنەی شەقام و سێبەری قەڵا لە شێوازی مۆدێرن.",
      body: `زنجیرەیەک لە کێشانەوەی شار کە باس لە ژیانی ڕۆژانە دەکات لە دەوروبەری قەڵا.`,
    },
    en: {
      title: "Erbil Alleys",
      summary: "Street studies and citadel shadows in a modern hand.",
      body: `A series of urban drawings about daily life around the citadel.`,
    },
  },
  {
    slug: "gallery-newroz-flame",
    coverFile: "newroz-flame.svg",
    colorA: "#2a1008",
    colorB: "#b22222",
    accent: "#f4c430",
    mark: "NF",
    priceCents: 7500,
    ku: {
      title: "ئاگری نەورۆز",
      summary: "گرافیکێکی هیوا و نوێبوونەوە.",
      body: `کارێکی گرافیکی کە سیمبوولی ئاگر و بەهار تێکەڵ دەکات.`,
    },
    en: {
      title: "Newroz Flame",
      summary: "A graphic piece on hope and renewal.",
      body: `Graphic art blending fire and spring symbolism.`,
    },
  },
  {
    slug: "gallery-blue-butterfly",
    coverFile: "blue-butterfly.svg",
    colorA: "#0b1d36",
    colorB: "#3d7ea6",
    accent: "#c5d5e8",
    mark: "BB",
    priceCents: 8800,
    ku: {
      title: "پەپوولەی شین",
      summary: "پەیکەر و وێنەی سروشتی ناسک.",
      body: `کارێک لەسەر ناسکی سروشت و جووڵەی پەپوولە.`,
    },
    en: {
      title: "Blue Butterfly",
      summary: "A delicate natural study.",
      body: `A work on natural delicacy and the motion of a butterfly.`,
    },
  },
  {
    slug: "gallery-portrait-dilan",
    coverFile: "portrait-dilan.svg",
    colorA: "#2c1810",
    colorB: "#6b4423",
    accent: "#f9f6ee",
    mark: "PD",
    priceCents: 15000,
    ku: {
      title: "پۆرترێتی دیلان",
      summary: "وێنەی ڕووخساری ژنێکی کورد بە شێوازی کلاسیک.",
      body: `پۆرترێتێک کە تیشک دەخاتە سەر شکۆ و هێمنی.`,
    },
    en: {
      title: "Portrait of Dilan",
      summary: "A classical portrait of a Kurdish woman.",
      body: `A portrait focused on dignity and calm.`,
    },
  },
  {
    slug: "gallery-color-fields",
    coverFile: "color-fields.svg",
    colorA: "#1f3a2a",
    colorB: "#c45c26",
    accent: "#f9f6ee",
    mark: "CF",
    priceCents: 6400,
    ku: {
      title: "کێڵگە ڕەنگەکان",
      summary: "ئەبستراکتێکی گەورە بۆ شوێنی نمایش.",
      body: `تابلۆیەکی ئەبستراکت گونجاو بۆ هۆڵ و گەلەری.`,
    },
    en: {
      title: "Color Fields",
      summary: "A large abstract suited for gallery walls.",
      body: `An abstract canvas designed for halls and gallery spaces.`,
    },
  },
];

function svgCover(w: Work) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${w.colorA}"/>
      <stop offset="55%" stop-color="${w.colorB}"/>
      <stop offset="100%" stop-color="${w.colorA}"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1100" fill="url(#g)"/>
  <path d="M0 220 L900 80 L900 200 L0 340 Z" fill="${w.accent}" opacity="0.12"/>
  <circle cx="700" cy="280" r="160" fill="${w.accent}" opacity="0.1"/>
  <rect x="70" y="70" width="760" height="960" fill="none" stroke="${w.accent}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="110" y="560" font-family="Georgia, serif" font-size="120" font-weight="700" fill="${w.accent}">${w.mark}</text>
  <text x="110" y="980" font-family="Georgia, serif" font-size="28" fill="${w.accent}" fill-opacity="0.7">Oak KRD · Gallery</text>
</svg>`;
}

async function main() {
  mkdirSync(imagesDir, { recursive: true });

  const author = await prisma.user.findUnique({
    where: { email: "books@naris-press.local" },
  });
  const org = await prisma.organization.findUnique({
    where: { slug: "naris-press" },
  });
  if (!author || !org) {
    throw new Error("Run npm run db:seed first so naris-press exists.");
  }

  for (const [i, work] of works.entries()) {
    writeFileSync(join(imagesDir, work.coverFile), svgCover(work), "utf8");
    const cover = `/images/gallery/${work.coverFile}`;
    const existing = await prisma.content.findFirst({ where: { slug: work.slug } });
    if (existing) {
      await prisma.contentVariant.deleteMany({ where: { contentId: existing.id } });
      await prisma.content.delete({ where: { id: existing.id } });
    }

    const publishedAt = new Date(Date.now() - i * 8 * 36e5);
    await prisma.content.create({
      data: {
        slug: work.slug,
        type: "GALLERY",
        title: work.ku.title,
        coverImageUrl: cover,
        isPaid: true,
        priceCents: work.priceCents,
        currency: "USD",
        authorId: author.id,
        organizationId: org.id,
        publishedAt,
        variants: {
          create: [
            {
              locale: "ku",
              format: "TEXT",
              status: "PUBLISHED",
              title: work.ku.title,
              summary: work.ku.summary,
              body: work.ku.body,
              publishedAt,
              wordCount: work.ku.body.split(/\s+/).filter(Boolean).length,
            },
            {
              locale: "en",
              format: "TEXT",
              status: "PUBLISHED",
              title: work.en.title,
              summary: work.en.summary,
              body: work.en.body,
              publishedAt,
              wordCount: work.en.body.split(/\s+/).filter(Boolean).length,
            },
          ],
        },
      },
    });
    console.log(`Upserted ${work.slug}`);
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
