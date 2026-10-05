import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "coalition-hands-over-k1-base-kirkuk-to-iraqi-army";
const COVER = "/images/kirkuk-k1-base-handover.jpg";

const kuTitle =
  "هێزەکانی هاوپەیمانان سەربازگەی کەی وەنیان لە کەرکووک رادەستی سوپای عێراق کرد";
const kuSummary =
  "هێزەکانی هاوپەیمانی نێودەوڵەتیی دژی داعش سەربازگەی کەی وەنیان لە کەرکووک چۆڵکرد و رادەستی هێزە ئەمنییەکانی عێراقیان کردەوە؛ دوای عەین ئەسەد بە دووەم گەورەترین سەربازگەی هاوپەیمانان لە عێراق دادەنرا.";
const kuBody = `هێزەکانی هاوپەیمانی نێودەوڵەتیی دژی داعش سەربازگەی کەی وەنیان لە پارێزگەی کەرکووک چۆڵکرد و رادەستی هێزە ئەمنییەکانی عێراقیان کردەوە، کە دوای سەربازگەی عەین ئەسەد لە پارێزگەی ئەنبار، بە دووەم گەورەترین سەربازگەی هاوپەیمانان لە عێراق ئەژمار دەکرا.

لیوا مەعن سەعدی، فەرماندەی ئۆپراسیۆنە هاوبەشەکانی کەرکووک رایگەیاند: "لە ماوەی رابردوودا هێزەکانی هاوپەیمانان هاوکاریی زۆریان پێشکەش کردووین، بەتایبەت لە بواری پشتیوانیی ئاسمانی و زانیاریی هەواڵگریدا. ئێستا هێزی ئاسمانی و فڕۆکەوانیی عێراق بوونەتە جێگرەوەیان و ئەركەكانیان گرتووەتە دەست."

کشانەوەی هێزەکانی هاوپەیمانان لە کاتێکدایە کە بوونی چەکی کۆنتڕۆڵنەکراو و هێزی سەربازی لە دەرەوەی یاسا و فەرمانی حکومەت بە مەترسییەکی جدی دادەنرێت. هەروەها، زیاتر لە 500 کیلۆمەتر بۆشایی ئەمنی لە نێوان سەنگەرەکانی هێزی پێشمەرگە و سوپای عێراقدا هەیە.

رێبوار تەها، جێگری پارێزگاری کەرکووک رایگەیاند: "لە کەرکووک و ناوچە جێناکۆکەکانی دەرەوەی ئیدارەی هەرێمی کوردستان، کە ناوچەکانی ماددەی 140ن، مایەی دڵخۆشییە ئەگەر هێزەکانی پێشمەرگە و سوپای عێراق پێکەوە ئاسایشی ناوچەکە بپارێزن و بۆشاییە ئەمنییەکان پڕ بکەنەوە."

ئێستا لە پارێزگەی کەرکووک پۆلێک لە سوپای عێراق و پێنج جۆر هێزی ئەمنی و سەربازیی جیاواز بڵاوەیان پێکراوە، بەڵام هێشتا مەترسییەکانی داعش کۆتاییان نەهاتووە و جموجۆڵی چەکدارانی ئەو رێکخراوە لە ناوچەکانی دۆڵی شای، چیای حەمرین و کانی دۆمەڵان بەدی دەکرێت.`;

const enTitle =
  "Coalition forces hand over K-1 base in Kirkuk to Iraqi army";
const enSummary =
  "The international anti-ISIS coalition vacated K-1 base in Kirkuk and handed it to Iraqi security forces — considered the coalition’s second-largest base in Iraq after Ain al-Asad.";
const enBody = `The international anti-ISIS coalition forces vacated the K-1 base in Kirkuk province and handed it over to Iraqi security forces. After Ain al-Asad in Anbar province, it was considered the coalition’s second-largest base in Iraq.

Brig. Gen. Ma’an Saadi, commander of joint operations in Kirkuk, said: "In the past period, coalition forces provided us with extensive support, especially in air support and intelligence. Now Iraq’s air force and aviation have become their replacement and have taken over their duties."

The withdrawal comes at a time when uncontrolled weapons and military forces outside the law and government authority are seen as a serious threat. There is also more than 500 kilometers of security vacuum between Peshmerga and Iraqi army positions.

Rebwar Taha, deputy governor of Kirkuk, said: "In Kirkuk and the disputed areas outside the Kurdistan Region’s administration — the Article 140 areas — it would be welcome if Peshmerga and the Iraqi army together secure the area and fill the security gaps."

A contingent of the Iraqi army and five different security and military forces are now deployed in Kirkuk province, but ISIS threats have not ended, and militant activity is still observed in areas such as the Shai Valley, Hamrin mountain, and Kani Domalan.

Source example for Oak KRD demo (Rudaw-style sample).`;

async function main() {
  const author = await prisma.user.findUnique({
    where: { email: "editor@rudaw-demo.local" },
  });
  const org = await prisma.organization.findUnique({
    where: { slug: "rudaw-demo" },
  });

  if (!author || !org) {
    throw new Error("Run npm run db:seed first so rudaw-demo publisher exists.");
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
      type: "NEWS",
      title: kuTitle,
      coverImageUrl: COVER,
      isPaid: false,
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

  console.log(`Added news: ${content.slug}`);
  console.log(`KU: /ku/c/${content.slug}`);
  console.log(`EN: /en/c/${content.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
