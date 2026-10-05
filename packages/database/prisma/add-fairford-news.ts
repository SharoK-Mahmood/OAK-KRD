import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "uk-police-arrest-dual-national-fairford-air-base";
const COVER = "/images/raf-fairford-police-roadblock.png";

const enTitle =
  "UK police arrest dual UK-Iranian man in Fairford air base investigation";
const enSummary =
  "British counter-terrorism police say they arrested a 25-year-old dual UK-Iranian national in London on suspicion of preparing terrorist acts, linked to the probe near RAF Fairford.";
const enBody = `LONDON — British counter-terrorism police investigating a suspected plot involving an air base used by the US to target Iran said on Thursday they had arrested a dual UK-Iranian national on suspicion of preparing terrorist acts.

In an incident which triggered a huge police response, raised alarm among Western allies, and remains largely unexplained, five British men in their 20s were arrested on Sunday on suspected terrorism and explosive offences near RAF Fairford in western England.

The men were later released without charge on police bail. But counter-terrorism police said they were considering whether a foreign state had been involved in the incident and Prime Minister Andy Burnham said on Wednesday it might have had an Iranian link.

Iran has said accusations it was involved were baseless and on Thursday summoned the British ambassador in Tehran over the issue.

In the latest development, police said they had arrested the 25-year-old dual national in London.

"The investigation into circumstances surrounding events in Gloucestershire is hugely complex, and our specialist teams are interrogating multiple lines of enquiry," Britain's Senior National Coordinator for Counter Terrorism Policing, Vicki Evans, said in a statement.

"As we've made clear, we're looking at all possible angles – including possible foreign state involvement."

Police launched a massive operation in the early hours of Sunday due to a range of information, including an alert from a local farmer who became suspicious of the men she had seen near the base in three vans.

However, the Times newspaper reported that one of the men had also called emergency services shortly before being arrested.

Detectives have confirmed that although petrol was found in the vans used by the men, no improvised explosive device was present.

Burnham said Britain was working closely with the US, whose bombers have in recent months used Fairford to launch missions against Iran, although US President Donald Trump said he would not have released the men, who police said were only freed under stringent conditions.

Trump previously said those involved had planned "big damage" while US Secretary of State Marco Rubio also pointed to the "hands of a foreign actor" in the incident.

Reporting by Sam Tabahriti and Michael Holden; editing by Philippa Fletcher and Andrew Heavens. Source example for Oak KRD demo (Reuters-style sample).`;

const kuTitle =
  "پۆلیسی بەریتانیا هاووڵاتیەکی دووڕەگەزی بەریتانی-ئێرانی دەستگیر دەکات لە لێکۆڵینەوەی بنکەی ئاسمانی فێرفۆرد";
const kuSummary =
  "پۆلیسی دژەتیرۆری بەریتانیا دەڵێت هاووڵاتیەکی 25 ساڵەی دووڕەگەزی بەریتانی-ئێرانی لە لەندەن دەستگیر کراوە بە تۆمەتی ئامادەکاری بۆ کردەوەی تیرۆریستی، پەیوەست بە لێکۆڵینەوەی نزیک RAF Fairford.";
const kuBody = `لەندەن — پۆلیسی دژەتیرۆری بەریتانیا کە لێکۆڵینەوە لە گومانی پیلانێک دەکات پەیوەست بە بنکەیەکی ئاسمانی کە ئەمریکا بۆ هێرشەکانی دژی ئێران بەکاری هێناوە، ڕۆژی پێنجشەممە ڕایگەیاند هاووڵاتیەکی دووڕەگەزی بەریتانی-ئێرانی بە تۆمەتی ئامادەکاری بۆ کردەوەی تیرۆریستی دەستگیر کراوە.

لە ڕووداوێکدا کە وەڵامدانەوەیەکی گەورەی پۆلیسی لێکەوتەوە و هاوپەیمانانی ڕۆژئاوای نیگەران کرد، هێشتا بە زۆری ڕوون نییە: یەکشەممە پێنج پیاوی بەریتانی لە تەمەنی بیستەکاندا لە نزیک بنکەی RAF Fairford لە ڕۆژئاوای ئینگلتەرا بە گومانی تاوانی تیرۆر و تەقەمەنی دەستگیر کران.

دواتر ئەو پیاوانە بەبێ تۆمەت لەسەر بەرەڵایی پۆلیس ئازاد کران. بەڵام پۆلیسی دژەتیرۆر وتی سەیری ئەوە دەکەن ئایا دەوڵەتێکی بیانی لە ڕووداوەکەدا بەشدار بووە، و سەرۆک وەزیران ئاندی بێرنهام چوارشەممە وتی ڕەنگە پەیوەندی ئێرانی هەبێت.

ئێران ڕایگەیاند تۆمەتەکانی بەشداریکردن بێبنەمان و پێنجشەممە باڵیۆزی بەریتانیای لە تاران بانگکرد.

لە نوێترین پێشهاتدا، پۆلیس وتی ئەو هاووڵاتیە دووڕەگەزەی 25 ساڵە لە لەندەن دەستگیر کراوە.

ڤیکی ئیڤانس، هەماهەنگکاری باڵای نیشتمانی بۆ پۆلیسی دژەتیرۆری بەریتانیا، لە بەیاننامەیەکدا وتی: «لێکۆڵینەوە لە بارودۆخی ڕووداوەکانی گلۆستەرشایەر زۆر ئاڵۆزە، و تیمە پسپۆڕەکانمان چەندین هێڵی لێکۆڵینەوە دەپشکنن.»

«وەک ڕوونمان کردووەتەوە، سەیری هەموو لایەنێک دەکەین — لەوانەش گونجانی بەشداری دەوڵەتێکی بیانی.»

پۆلیس لە کاتە زووەکانی یەکشەممە ئۆپەراسیۆنێکی گەورەی دەستپێکرد بەهۆی زانیاری جۆراوجۆر، لەوانە ئاگادارییەکی جوتیارێکی ناوخۆیی کە گومانی لەو پیاوانە کرد کە لە سێ ڤاندا لە نزیک بنکەکە بینیبوونی.

ڕۆژنامەی تایمز بڵاوی کردەوە یەکێک لە پیاوەکان کەمێک پێش دەستگیرکردن پەیوەندی بە خزمەتگوزارییەکانی فریاگوزاری کردووە.

لێکۆڵەران پشتڕاستیان کردەوە کە هەرچەندە پەترۆڵ لە ڤانەکاندا دۆزرایەوە، هیچ ئامێرێکی تەقەمەنی دروستکراو نەبوو.

بێرنهام وتی بەریتانیا لەگەڵ ئەمریکا کار دەکات، کە لە مانگەکانی ڕابردوودا بۆمبھاوێژەکانی لە فێرفۆردەوە بۆ هێرشەکانی دژی ئێران بەکارهێناون.

سەرچاوە: نموونەی هەواڵ بۆ Oak KRD (شێوازی Reuters).`;

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
      title: enTitle,
      coverImageUrl: COVER,
      isPaid: false,
      authorId: author.id,
      organizationId: org.id,
      publishedAt: now,
      variants: {
        create: [
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
        ],
      },
    },
  });

  console.log(`Added news: ${content.slug}`);
  console.log(`EN: /en/c/${content.slug}`);
  console.log(`KU: /ku/c/${content.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
