import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "mazloum-abdi-appointed-syria-presidential-advisor";
const COVER = "/images/mazloum-abdi-syria-advisor.jpg";

const kuTitle =
  "مەزڵووم عەبدی بە فەرمانێکی ئەحمەد شەرع دەکرێتە راوێژکاری سەرۆکایەتیی کۆماری سووریا";
const kuSummary =
  "ئاژانسی سانا بڵاوی کردەوە ئەحمەد شەرع بە فەرمانێکی سەرۆکایەتی مەزڵووم عەبدی، فەرماندەی پێشووی گشتیی هەسەدەی وەک راوێژکاری سەرۆکایەتیی کۆمار دەستنیشان کردووە.";
const kuBody = `ئاژانسی فەرمیی هەواڵی سووریا (سانا) بڵاوی کردەوە، ئەحمەد شەرع، سەرۆککۆماری قۆناخی راگوزەری سووریا بە فەرمانێکی سەرۆکایەتی، مەزڵووم عەبدی، فەرماندەی پێشووی گشتیی هێزەکانی سووریای دیموکرات (هەسەدە)ی وەک راوێژکاری سەرۆکایەتیی کۆمار دەستنیشان کردووە.

وێنەی فەرمانە سەرۆکایەتییەکە لە لایەن ساناوە بڵاوکراوەتەوە کە بە ئاماژە کردن بە ناوی تەواوی مەزڵووم عەبدی، دەڵێت: "بەڕێز مستەفا خەلیل عەبدی، دەکرێتە راوێژکاری سەرۆکایەتیی کۆمار."

تۆڕی میدیایی رووداو پێشتر وەک یەکەمین دەزگای میدیایی لە سەر زاری سێ سەرچاوەوە بڵاوی کردەوە کە پێشنیاز کراوە فەرماندە کوردەکە ببێتە راوێژکاری سەرۆککۆماری سووریا.

رۆژی سێشەممە، 25ی ئاب شاندێکی رۆژئاوای کوردستان بە مەبەستی کۆبوونەوە لەگەڵ بەرپرسانی باڵای سووریا چووە دیمەشق. لەو کۆبوونەوەیەدا پێشنیازی پۆست بۆ مەزڵووم عەبدی و ئیلهام ئەحمەد، هاوسەرۆکی پێشووی پەیوەندییەکانی دەرەوەی بەڕێوەبەرایەتیی خۆسەر کرابوو.

ئەوکات رووداو وەک یەکەمین سەرچاوە بلاوی کردەوە، هەر لەو کۆبوونەوانەدا باس لە خوێندن بە زمانی کوردی لە رۆژئاوای کوردستان کراوە و هەردوولا لە رێککەوتنەوە نزیکن.

چەند کاژێرێک پێش بڵاوکردنەوەی فەرمانە سەرۆکایەتییەکەی تایبەت بە پۆستی مەزڵووم عەبدی، وەزارەتی پەروەردەی سووریا زمانی کوردی وەک زمانێکی نیشتمانی لە پڕۆگرامی خوێندنی قوتابخانە حکومی و تایبەتەکان لە رۆژئاوای کوردستان جێگیرکرد. بەپێی بڕیارەکە، نمرەی وانەی کوردی دەچێتە نێو کۆنمرەی کۆتایی قوتابیان.

محەممەد عەبدولرەحمان ترکو، وەزیری پەروەردە و فێرکردنی سووریا بڕیارێکی تایبەت بە هەموارکردنەوەی رێنماییە جێبەجێکارییەکانی مەرسوومی ژمارە 13ـی ساڵی 2026 دەرکرد و ئاماژەی بەوە کرد، ئامانج لەم بڕیارە "پاراستنی مافە زمانەوانی و کولتوورییەکان و بەهێزکردنی فرەچەشنییە لە سووریا."

بەپێی بڕیارە نوێیەکە، خوێندنی زمانی کوردی لەو ناوچانەی "چڕی دانیشتووانی کوردیان تێدایە" دەبێتە ناچاری.

ئەو سەرچاوانەی کە رۆژی سێشەممە قسەیان بۆ رووداو کرد، ئاماژەیان بەوەش کردبوو کە پێشنیاز بۆ ئیلهام ئەحمەدیش کراوە لە لیژنەی پەیوەندییەکانی دەرەوەی پەرلەمانی سووریا بێت. بەڵام هێشتا هیچ بڕیارێک لەم بارەیەوە دەرنەکراوە.

سەبارەت بە مەزڵووم عەبدی، یەکێک لە سەرچاوەکان بە رووداوی راگەیاندبوو، پێشنیازەکەی پەسند کردووە و دەبێتە راوێژکار.

ئەم پێشهاتە لە کاتێکدایە، مەزڵووم عەبدی لە هەڤپەیڤینێکدا لەگەڵ تۆڕی میدیایی رووداو، کە رۆژی شەممە 22-08-2026 پەخش کرا، بە رووداوی راگەیاند، ئەگەر رێککەوتنی 29ی مانگی یەکی ئەم ساڵ "لە ئاست خواستەکانی ئێمەش دا نەبووبێت، پێگەیەک بۆ کورد لەنێو دەوڵەتی سووریادا دروست دەکات" و هەموو هەوڵێک دەدەن سەربکەوێ.

دوای ئەوەی 8ی کانوونی دووەم هێزەکانی سوپای سووریا هێرشیان کردە سەر گەڕەکە زۆرینە کوردنشینەکانی حەلەب و دواتر هێرشیانکردە سەر ناوچەکانی ژێر کۆنترۆڵی هەسەدە، لە 29ـی هەمان مانگ رێککەوتنێکیان واژۆ کرد و شەڕ راگیرا، ئەوەش بەگوێرەی رێککەوتنێکی گشتگیر و لێکتێگەیشتن لەبارەی پڕۆسەی تێکەڵکردنێکی ریزبەندیی هێزە سەربازییەکان و کارگێڕییەکانی هەردوولا کە بە رێککەوتنی 29ی کانوونی دووەم ناسراوە.

مەزڵووم عەبدی و ئیلهام ئەحمەد دوو کەسایەتیی ناسراوی بەڕێوەبەرایەتیی خۆسەر بوون. مەزڵووم عەبدی فەرماندەی گشتیی هێزەکانی سووریای دیموکرات و ئیلهام ئەحمەد، هاوسەرۆکی فەرمانگەی پەیوەندییەکانی دەرەوەی بەڕێوەبەرایەتیی خۆسەر بوو.`;

const enTitle =
  "Mazloum Abdi appointed presidential adviser of Syria by decree of Ahmed al-Sharaa";
const enSummary =
  "Syria's official SANA news agency says transitional President Ahmed al-Sharaa appointed Mazloum Abdi, former SDF general commander, as presidential adviser.";
const enBody = `Syria's official news agency SANA reported that Ahmed al-Sharaa, transitional president of Syria, appointed Mazloum Abdi, former general commander of the Syrian Democratic Forces (SDF), as presidential adviser by presidential decree.

The decree published by SANA, referring to Abdi's full name, states: "Mr. Mustafa Khalil Abdi is appointed as adviser to the presidency of the republic."

Rudaw had earlier reported, citing three sources, that the Kurdish commander had been proposed for the post of adviser to Syria's president.

On Tuesday, 25 August, a delegation from Rojava traveled to Damascus for meetings with senior Syrian officials. Posts were proposed for Mazloum Abdi and Ilham Ahmed, former co-chair of the Autonomous Administration's foreign relations.

Hours before the decree on Abdi's post was published, Syria's Education Ministry included Kurdish as a national language in the curriculum of public and private schools in Rojava. Under the decision, Kurdish course grades count toward students' final averages.

Education Minister Mohammed Abdulrahman Turko issued a decision amending implementing instructions of Decree No. 13 of 2026, saying the aim is "protecting linguistic and cultural rights and strengthening diversity in Syria." Kurdish language instruction becomes mandatory in areas with dense Kurdish populations.

Sources who spoke to Rudaw on Tuesday also said Ilham Ahmed had been proposed for Syria's parliament foreign relations committee, but no decision has been issued yet.

This comes after Abdi told Rudaw in an interview aired on Saturday, 22 August 2026, that even if the 29 January agreement "did not fully meet our aspirations, it creates a place for Kurds within the Syrian state," and that they would do everything for it to succeed.

After Syrian army forces attacked predominantly Kurdish neighborhoods of Aleppo on 8 January and later areas under SDF control, the sides signed an agreement on 29 January and halted fighting — known as the 29 January agreement on integrating military and administrative structures.

Mazloum Abdi and Ilham Ahmed were well-known figures in the Autonomous Administration: Abdi as SDF general commander and Ahmed as co-chair of its foreign relations office.

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
  .finally(async () => {
    await prisma.$disconnect();
  });
