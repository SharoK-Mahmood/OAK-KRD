import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "integrity-committee-social-protection-1-7-trillion";
const COVER = "/images/iraqi-dinar-social-protection.jpg";

const kuTitle =
  "راپۆرتێکی لیژنەی دەستپاکی: وەزارەتی دارایی 1.7 تریلیۆن دیناری پاراستنی کۆمەڵایەتی کێشاوەتەوە";
const kuSummary =
  "راپۆرتی لیژنەی دەستپاکی پەرلەمانی عێراق ئاشکرای دەکات وەزارەتی دارایی 1.7 تریلیۆن دینار لە سندووقی پاراستنی کۆمەڵایەتی کێشاوەتەوە، لە کاتێکدا 1.3 ملیۆن خێزان هاوکارییەکان وەرناگرن.";
const kuBody = `راپۆرتێکی لیژنەی دەستپاکی لە پەرلەمانی عێراق ئاشکرای دەکات، وەزارەتی دارایی عێراق 1.7 تریلیۆن دیناری لە سندووقی دەستەی پاراستنی کۆمەڵایەتی کێشاوەتەوە، لە کاتێکدا 1.3 ملیۆن خێزان مامەڵەکانیان تەواو بووە، بەڵام بەهۆی نەبوونی تەرخانکراوی داراییەوە هاوکارییەکان وەرناگرن.

ئەم زانیارییانە لە نێو راپۆرتی لیژنەیەکی لاوەکیی دەستپاکیی پەرلەمانی عێراقدا هاتوون کە تایبەت بووە بە بەدواداچوون بۆ دۆسیەکانی دەستەی پاراستنی کۆمەڵایەتی و کۆپییەکی دەست تۆڕی میدیایی رووداو کەوتووە.

بەپێی راپۆرتەکە، کۆی پارەی سندووقی پاراستنی کۆمەڵایەتی 2.4 تریلیۆن دینار بووە، بەڵام وەزارەتی دارایی 1.7 تریلیۆن دیناری لێ بردووەتەوە بەبێ ئەوەی هۆکارەکەی بە روونی ئاشکرا بکات؛ لە بەرامبەردا بانکی رافیدەین رایگەیاندووە بەهۆی کێشەی کەمیی نەختینەوە (کاش) ناتوانێت ئەو پارەیە بۆ وەزارەت تەرخان بکات.

بەگوێرەی داتاکانی نێو راپۆرتەکە تاوەکو تەممووزی ئەم ساڵ، دوو ملیۆن و 51 هەزار و 527 خێزان مانگانە بە بڕی 450 بۆ 460 ملیار دینار هاوکاریی کۆمەڵایەتییان وەرگرتووە. هەروەها 1.3 ملیۆن خێزانی دیکە مامەڵەکانیان تەواو کردووە و چاوەڕێی تەرخانکردنی بودجەن، کە مانگانە پێویستیان بە 267.9 ملیار دینارە.

ئەو توێژانەی هاوکارییەکە دەیانگرێتەوە بریتین لە (کەمئەندامان، خاوەن پێداویستییە تایبەتەکان، بێ هاوسەران، بێ باوان، نەوجەوانانی دەستگیرکراو و منداڵانی نەخۆش) و بڕی پارەکەش مانگانە لە نێوان 100 بۆ 500 هەزار دیناردایە.

لیژنەکەی دەستپاکی ئەوەشی ئاشکرا کردووە کە لە ئەنجامی بەدواداچوونەکانیاندا دەرکەوتووە، نزیکەی 300 هەزار خێزان بە ناڕەوا مووچە و هاوکاریی پاراستنی کۆمەڵایەتییان وەرگرتووە. لەو چوارچێوەیەشدا تاوەکو ئێستا 189.6 ملیار دینار لەو پارانە گەڕێندراونەتەوە و پرۆسەی وەرگرتنەوەیان بە قیستی مانگانە بەردەوامە.

لە کۆتایی راپۆرتەکەدا، لیژنەی دەستپاکی داوای کردووە بڕیارێکی ساڵی 2024ـی ئەنجوومەنی وەزیران رابگیرێت کە بووەتە هۆی بێبەشبوونی کەسانی نوێ لە وەرگرتنی هاوکارییەکان، هەروەها داوا کراوە، پێویستە وەزارەتی دارایی ئەو 1.7 تریلیۆن دینارە بۆ دەستەکە بگەڕێنێتەوە.

هاوکات داواش کراوە بودجەی تایبەت بۆ توێژەرانی کۆمەڵایەتی دابین بکرێت؛ چونکە تەنیا بڕی هەزار دینار بۆ خەرجیی هاتووچۆی هەر توێژەرێک دیاریکراوە و ئەمەش وایکردووە بەشێک لە خێزانەکان لەسەر گیرفانی خۆیان پارەی گواستنەوەی توێژەران بدەن.`;

const enTitle =
  "Integrity committee report: Finance Ministry withdrew 1.7 trillion dinars from social protection";
const enSummary =
  "An Iraqi parliament integrity committee report says the Finance Ministry took 1.7 trillion dinars from the social protection fund while 1.3 million families await unpaid assistance.";
const enBody = `A report by an integrity subcommittee in the Iraqi parliament says Iraq’s Ministry of Finance withdrew 1.7 trillion dinars from the Social Protection Authority fund, while 1.3 million families have completed their cases but are not receiving assistance due to a lack of allocated funding.

According to the report, the social protection fund totaled 2.4 trillion dinars, but the Finance Ministry took 1.7 trillion without clearly stating the reason. Rafidain Bank said it cannot allocate the money because of a cash shortage.

Data in the report show that as of July this year, 2,051,527 families received monthly social assistance totaling 450–460 billion dinars. Another 1.3 million families have completed procedures and are waiting for budget allocation, needing 267.9 billion dinars per month.

Eligible groups include people with disabilities, those with special needs, widows, orphans, detained juveniles, and sick children, with monthly amounts between 100,000 and 500,000 dinars.

The committee also found about 300,000 families received social protection payments improperly. So far, 189.6 billion dinars have been recovered, with repayments continuing in monthly installments.

The committee called for suspending a 2024 Council of Ministers decision that left new applicants without assistance, and demanded the Finance Ministry return the 1.7 trillion dinars to the authority. It also asked for dedicated funding for social researchers, noting only 1,000 dinars is set for each researcher’s transport — which has pushed some families to pay researchers’ travel costs themselves.`;

async function main() {
  let author = await prisma.user.findUnique({
    where: { email: "editor@rudaw-demo.local" },
  });
  let org = await prisma.organization.findUnique({
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
  console.log(`Open: /ku/c/${content.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
