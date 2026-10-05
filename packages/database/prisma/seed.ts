import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedItem = {
  slug: string;
  type:
    | "NEWS"
    | "ARTICLE"
    | "BOOK"
    | "EBOOK"
    | "AUDIOBOOK"
    | "RESEARCH"
    | "PODCAST"
    | "REPORT"
    | "PRESS_RELEASE";
  isPaid?: boolean;
  coverImageUrl?: string;
  orgSlug?: string;
  authorEmail: string;
  daysAgo: number;
  variants: {
    locale: "ku" | "ar" | "en";
    title: string;
    summary: string;
    body: string;
    format?: "TEXT" | "AUDIO" | "VIDEO" | "SUMMARY";
  }[];
};

const publishers = [
  {
    email: "editor@rudaw-demo.local",
    name: "Nali Osman",
    org: {
      slug: "rudaw-demo",
      name: "Rudaw Demo Desk",
      nameKu: "ڕووداو",
      nameAr: "روداو",
      description: "Sample Kurdish newsroom for Oak KRD demos.",
    },
  },
  {
    email: "desk@kurdistan24-demo.local",
    name: "Shilan Hassan",
    org: {
      slug: "k24-demo",
      name: "Kurdistan24 Demo",
      nameKu: "کوردستان٢٤",
      nameAr: "كردستان٢٤",
      description: "Demo publisher for politics, culture, and economy.",
    },
  },
  {
    email: "books@naris-press.local",
    name: "Dilan Karim",
    org: {
      slug: "naris-press",
      name: "Naris Press",
      nameKu: "چاپەمەنی ناریس",
      nameAr: "دار ناريس للنشر",
      description: "Independent Kurdish books, audiobooks, and research.",
    },
  },
];

const items: SeedItem[] = [
  {
    slug: "coalition-hands-over-k1-base-kirkuk-to-iraqi-army",
    type: "NEWS",
    coverImageUrl: "/images/kirkuk-k1-base-handover.jpg",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 0,
    variants: [
      {
        locale: "ku",
        title:
          "هێزەکانی هاوپەیمانان سەربازگەی کەی وەنیان لە کەرکووک رادەستی سوپای عێراق کرد",
        summary:
          "هێزەکانی هاوپەیمانی نێودەوڵەتیی دژی داعش سەربازگەی کەی وەنیان لە کەرکووک چۆڵکرد و رادەستی هێزە ئەمنییەکانی عێراقیان کردەوە.",
        body: `هێزەکانی هاوپەیمانی نێودەوڵەتیی دژی داعش سەربازگەی کەی وەنیان لە پارێزگەی کەرکووک چۆڵکرد و رادەستی هێزە ئەمنییەکانی عێراقیان کردەوە، کە دوای سەربازگەی عەین ئەسەد لە پارێزگەی ئەنبار، بە دووەم گەورەترین سەربازگەی هاوپەیمانان لە عێراق ئەژمار دەکرا.`,
      },
      {
        locale: "en",
        title: "Coalition forces hand over K-1 base in Kirkuk to Iraqi army",
        summary:
          "The international anti-ISIS coalition vacated K-1 base in Kirkuk and handed it to Iraqi security forces.",
        body: `The international anti-ISIS coalition vacated the K-1 base in Kirkuk and handed it to Iraqi security forces — considered the coalition’s second-largest base in Iraq after Ain al-Asad.`,
      },
    ],
  },
  {
    slug: "uk-police-arrest-dual-national-fairford-air-base",
    type: "NEWS",
    coverImageUrl: "/images/raf-fairford-police-roadblock.png",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 0,
    variants: [
      {
        locale: "en",
        title:
          "UK police arrest dual UK-Iranian man in Fairford air base investigation",
        summary:
          "British counter-terrorism police say they arrested a 25-year-old dual UK-Iranian national in London on suspicion of preparing terrorist acts, linked to the probe near RAF Fairford.",
        body: `LONDON — British counter-terrorism police investigating a suspected plot involving an air base used by the US to target Iran said on Thursday they had arrested a dual UK-Iranian national on suspicion of preparing terrorist acts.

Five British men in their 20s were earlier arrested near RAF Fairford and later released on bail. Police are examining possible foreign state involvement. Iran has denied the accusations.

Detectives said petrol was found in vans used by the men, but no improvised explosive device was present.`,
      },
      {
        locale: "ku",
        title:
          "پۆلیسی بەریتانیا هاووڵاتیەکی دووڕەگەزی بەریتانی-ئێرانی دەستگیر دەکات لە لێکۆڵینەوەی بنکەی ئاسمانی فێرفۆرد",
        summary:
          "پۆلیسی دژەتیرۆری بەریتانیا دەڵێت هاووڵاتیەکی 25 ساڵەی دووڕەگەزی بەریتانی-ئێرانی لە لەندەن دەستگیر کراوە بە تۆمەتی ئامادەکاری بۆ کردەوەی تیرۆریستی.",
        body: `لەندەن — پۆلیسی دژەتیرۆری بەریتانیا ڕایگەیاند هاووڵاتیەکی دووڕەگەزی بەریتانی-ئێرانی بە تۆمەتی ئامادەکاری بۆ کردەوەی تیرۆریستی دەستگیر کراوە، پەیوەست بە لێکۆڵینەوەی نزیک بنکەی RAF Fairford.`,
      },
    ],
  },
  {
    slug: "integrity-committee-social-protection-1-7-trillion",
    type: "NEWS",
    coverImageUrl: "/images/iraqi-dinar-social-protection.jpg",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 0,
    variants: [
      {
        locale: "ku",
        title:
          "راپۆرتێکی لیژنەی دەستپاکی: وەزارەتی دارایی 1.7 تریلیۆن دیناری پاراستنی کۆمەڵایەتی کێشاوەتەوە",
        summary:
          "راپۆرتی لیژنەی دەستپاکی پەرلەمانی عێراق ئاشکرای دەکات وەزارەتی دارایی 1.7 تریلیۆن دینار لە سندووقی پاراستنی کۆمەڵایەتی کێشاوەتەوە، لە کاتێکدا 1.3 ملیۆن خێزان هاوکارییەکان وەرناگرن.",
        body: `راپۆرتێکی لیژنەی دەستپاکی لە پەرلەمانی عێراق ئاشکرای دەکات، وەزارەتی دارایی عێراق 1.7 تریلیۆن دیناری لە سندووقی دەستەی پاراستنی کۆمەڵایەتی کێشاوەتەوە، لە کاتێکدا 1.3 ملیۆن خێزان مامەڵەکانیان تەواو بووە، بەڵام بەهۆی نەبوونی تەرخانکراوی داراییەوە هاوکارییەکان وەرناگرن.

ئەم زانیارییانە لە نێو راپۆرتی لیژنەیەکی لاوەکیی دەستپاکیی پەرلەمانی عێراقدا هاتوون کە تایبەت بووە بە بەدواداچوون بۆ دۆسیەکانی دەستەی پاراستنی کۆمەڵایەتی و کۆپییەکی دەست تۆڕی میدیایی رووداو کەوتووە.

بەپێی راپۆرتەکە، کۆی پارەی سندووقی پاراستنی کۆمەڵایەتی 2.4 تریلیۆن دینار بووە، بەڵام وەزارەتی دارایی 1.7 تریلیۆن دیناری لێ بردووەتەوە بەبێ ئەوەی هۆکارەکەی بە روونی ئاشکرا بکات؛ لە بەرامبەردا بانکی رافیدەین رایگەیاندووە بەهۆی کێشەی کەمیی نەختینەوە (کاش) ناتوانێت ئەو پارەیە بۆ وەزارەت تەرخان بکات.

بەگوێرەی داتاکانی نێو راپۆرتەکە تاوەکو تەممووزی ئەم ساڵ، دوو ملیۆن و 51 هەزار و 527 خێزان مانگانە بە بڕی 450 بۆ 460 ملیار دینار هاوکاریی کۆمەڵایەتییان وەرگرتووە. هەروەها 1.3 ملیۆن خێزانی دیکە مامەڵەکانیان تەواو کردووە و چاوەڕێی تەرخانکردنی بودجەن، کە مانگانە پێویستیان بە 267.9 ملیار دینارە.

ئەو توێژانەی هاوکارییەکە دەیانگرێتەوە بریتین لە (کەمئەندامان، خاوەن پێداویستییە تایبەتەکان، بێ هاوسەران، بێ باوان، نەوجەوانانی دەستگیرکراو و منداڵانی نەخۆش) و بڕی پارەکەش مانگانە لە نێوان 100 بۆ 500 هەزار دیناردایە.

لیژنەکەی دەستپاکی ئەوەشی ئاشکرا کردووە کە لە ئەنجامی بەدواداچوونەکانیاندا دەرکەوتووە، نزیکەی 300 هەزار خێزان بە ناڕەوا مووچە و هاوکاریی پاراستنی کۆمەڵایەتییان وەرگرتووە. لەو چوارچێوەیەشدا تاوەکو ئێستا 189.6 ملیار دینار لەو پارانە گەڕێندراونەتەوە و پرۆسەی وەرگرتنەوەیان بە قیستی مانگانە بەردەوامە.

لە کۆتایی راپۆرتەکەدا، لیژنەی دەستپاکی داوای کردووە بڕیارێکی ساڵی 2024ـی ئەنجوومەنی وەزیران رابگیرێت کە بووەتە هۆی بێبەشبوونی کەسانی نوێ لە وەرگرتنی هاوکارییەکان، هەروەها داوا کراوە، پێویستە وەزارەتی دارایی ئەو 1.7 تریلیۆن دینارە بۆ دەستەکە بگەڕێنێتەوە.

هاوکات داواش کراوە بودجەی تایبەت بۆ توێژەرانی کۆمەڵایەتی دابین بکرێت؛ چونکە تەنیا بڕی هەزار دینار بۆ خەرجیی هاتووچۆی هەر توێژەرێک دیاریکراوە و ئەمەش وایکردووە بەشێک لە خێزانەکان لەسەر گیرفانی خۆیان پارەی گواستنەوەی توێژەران بدەن.`,
      },
      {
        locale: "en",
        title:
          "Integrity committee report: Finance Ministry withdrew 1.7 trillion dinars from social protection",
        summary:
          "An Iraqi parliament integrity committee report says the Finance Ministry took 1.7 trillion dinars from the social protection fund while 1.3 million families await unpaid assistance.",
        body: `A report by an integrity subcommittee in the Iraqi parliament says Iraq’s Ministry of Finance withdrew 1.7 trillion dinars from the Social Protection Authority fund, while 1.3 million families have completed their cases but are not receiving assistance due to a lack of allocated funding.

According to the report, the social protection fund totaled 2.4 trillion dinars, but the Finance Ministry took 1.7 trillion without clearly stating the reason. Rafidain Bank said it cannot allocate the money because of a cash shortage.

Data in the report show that as of July this year, 2,051,527 families received monthly social assistance totaling 450–460 billion dinars. Another 1.3 million families have completed procedures and are waiting for budget allocation, needing 267.9 billion dinars per month.

The committee called for the Finance Ministry to return the 1.7 trillion dinars and for dedicated funding for social researchers.`,
      },
    ],
  },
  {
    slug: "erbil-citadel-evening-concert",
    type: "NEWS",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 0,
    variants: [
      {
        locale: "ku",
        title: "کۆنسێرتێکی شەوانە لە قەڵای هەولێر بەڕێوەدەچێت",
        summary:
          "هەزاران کەس بەشداری کۆنسێرتێکی کولتووری دەکەن لە قەڵای هەولێر، لە چوارچێوەی فێستیڤاڵی هاوینەی شار.",
        body: `هەولێر — ئەمشەو کۆنسێرتێکی مۆسیقای کوردی لە قەڵای هەولێر بەڕێوەچوو، کە تێیدا هونەرمەندانی ناوخۆ و میوانانی دەرەوە بەشداریان کرد.

ڕێکخەرانی فێستیڤاڵەکە وتیان ئامانج لەم بۆنەیە پێشخستنی میراتی کولتووری و ڕاکێشانی گەشتیارە بۆ ناوەندی شار.

پۆلیس و کارگێڕی شارەوانی ڕێگاوبانی تایبەتیان بۆ هاتووچۆی خەڵک دانا، و بازاڕەکانی دەوروبەری قەڵا تا درەنگانی شەو کراونەوە.`,
      },
      {
        locale: "en",
        title: "Evening concert draws crowds to Erbil Citadel",
        summary:
          "Thousands attend a cultural concert at Erbil Citadel as part of the city’s summer festival.",
        body: `Erbil — An evening of Kurdish music filled Erbil Citadel tonight, featuring local artists and visiting performers.

Festival organizers said the event aims to promote cultural heritage and attract visitors to the historic center of the city.

Police and municipal teams managed special traffic routes while nearby markets stayed open late into the night.`,
      },
      {
        locale: "ar",
        title: "حفل مسائي يجذب الآلاف إلى قلعة أربيل",
        summary:
          "آلاف الأشخاص يحضرون حفلاً ثقافياً في قلعة أربيل ضمن مهرجان المدينة الصيفي.",
        body: `أربيل — أقيم مساء اليوم حفل للموسيقى الكردية في قلعة أربيل بمشاركة فنانين محليين وضيوف من خارج الإقليم.

وقال منظمو المهرجان إن الهدف هو تعزيز التراث الثقافي وجذب الزوار إلى وسط المدينة التاريخي.`,
      },
    ],
  },
  {
    slug: "oil-exports-pipeline-talks",
    type: "NEWS",
    orgSlug: "k24-demo",
    authorEmail: "desk@kurdistan24-demo.local",
    daysAgo: 1,
    variants: [
      {
        locale: "ku",
        title: "گفتوگۆکان بەردەوامن لەسەر هەناردەکردنی نەوت لە ڕێگەی بۆری",
        summary:
          "بەرپرسانی هەرێم و بەغدا باس لە میکانیزمی هاوبەشی فرۆشتنی نەوت و دابەشکردنی داهات دەکەن.",
        body: `هەولێر — سەرچاوە فەرمییەکان ئاماژە بەوە دەکەن کە گفتوگۆ تەکنیکییەکان لە نێوان حکومەتی هەرێمی کوردستان و حکومەتی عێراق بەردەوامن سەبارەت بە هەناردەکردنی نەوت لە ڕێگەی بۆری و شێوازی دابەشکردنی داهات.

شارەزایانی ئابووری دەڵێن گەڕانەوەی هەناردەکردن کاریگەری ڕاستەوخۆ لەسەر بودجە و مووچەی فەرمانبەران دەبێت.`,
      },
      {
        locale: "en",
        title: "Talks continue on restarting oil exports via pipeline",
        summary:
          "KRG and Baghdad officials discuss a joint mechanism for oil sales and revenue sharing.",
        body: `Erbil — Officials say technical talks between the Kurdistan Regional Government and Iraq’s federal government are continuing on pipeline exports and revenue distribution.

Economists note that a restart would have a direct impact on the regional budget and public-sector salaries.`,
      },
    ],
  },
  {
    slug: "sulaymaniyah-university-research-grant",
    type: "NEWS",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 2,
    variants: [
      {
        locale: "ku",
        title: "زانکۆی سلێمانی گرانتێکی توێژینەوەی نێودەوڵەتی وەردەگرێت",
        summary:
          "پڕۆژەیەک لەسەر کشتوکاڵی بەردەوام و ئاو لە ناوچە شاخاوییەکان پشتگیری دارایی وەردەگرێت.",
        body: `سلێمانی — زانکۆی سلێمانی ڕایگەیاند کە تیمێکی توێژەران گرانتێکی نێودەوڵەتیان بەدەستهێناوە بۆ لێکۆڵینەوە لە کشتوکاڵی بەردەوام و بەڕێوەبردنی ئاو لە ناوچە شاخاوییەکانی کوردستان.

سەرۆکی تیمەکە وتی ئەنجامەکان لەگەڵ شارەوانی و جووتیاران هاوبەش دەکرێن.`,
      },
      {
        locale: "en",
        title: "University of Sulaimani wins international research grant",
        summary:
          "A project on sustainable agriculture and water in mountain areas receives funding support.",
        body: `Sulaimani — The University of Sulaimani announced that a research team has secured an international grant to study sustainable farming and water management in Kurdistan’s mountain regions.

The team lead said findings will be shared with municipalities and farmers.`,
      },
    ],
  },
  {
    slug: "duhok-new-public-park",
    type: "NEWS",
    orgSlug: "k24-demo",
    authorEmail: "desk@kurdistan24-demo.local",
    daysAgo: 3,
    variants: [
      {
        locale: "ku",
        title: "پارکێکی نوێ لە دهۆک بۆ خێزانەکان دەکرێتەوە",
        summary:
          "پڕۆژەکە یاریگا، شوێنی پیاسە، و بۆشایی سەوز لەخۆدەگرێت لە ڕۆژئاوای شار.",
        body: `دهۆک — کارگێڕی شارەوانی دهۆک پارکێکی نوێی بۆ خێزانەکان کردەوە کە یاریگا بۆ منداڵان، ڕێڕەوی پیاسە، و بۆشایی سەوزی تێدایە.

دانیشتووان پێشوازییان لە پڕۆژەکە کرد و داوایان کرد ڕووناکی و خزمەتگوزاری زیاتر زیاد بکرێت.`,
      },
      {
        locale: "ar",
        title: "افتتاح حديقة عامة جديدة في دهوك",
        summary:
          "تشمل المشروع ملاعب وممرات للمشاة ومساحات خضراء في غرب المدينة.",
        body: `دهوك — افتتحت بلدية دهوك حديقة عامة جديدة للعائلات تضم ملاعب أطفال وممرات للمشي ومساحات خضراء.`,
      },
    ],
  },
  {
    slug: "kurdish-language-in-digital-age",
    type: "ARTICLE",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 1,
    variants: [
      {
        locale: "ku",
        title: "زمانی کوردی لە سەردەمی دیجیتاڵدا: هەل و ئاستەنگ",
        summary:
          "چۆن ئەپ و پلاتفۆڕمەکان دەتوانن یارمەتی پاراستن و پەرەپێدانی زمانی کوردی بدەن.",
        body: `زمانی کوردی لەسەر ئینتەرنێت زیاتر دەرکەوتووە، بەڵام هێشتا کێشەی فۆنت، کیبۆرد، و نەبوونی ناوەڕۆکی ستاندارد هەیە.

پێویستە دامەزراوەکان و بڵاوکەرەوەکان هاوکاری بکەن بۆ دروستکردنی فەرهەنگ، وەرگێڕان، و ناوەڕۆکی پەروەردەیی بە کوردی.

پلاتفۆڕمەکانی وەک Oak KRD دەتوانن ببنە شوێنێک بۆ کۆکردنەوەی وتار، کتێب، و توێژینەوە بە چەند زمانێک.`,
      },
      {
        locale: "en",
        title: "Kurdish language in the digital age: openings and obstacles",
        summary:
          "How apps and platforms can help preserve and grow Kurdish online.",
        body: `Kurdish is more visible online than a decade ago, yet fonts, keyboards, and a shortage of standardized content remain challenges.

Institutions and publishers need to collaborate on dictionaries, translations, and educational material in Kurdish.

Platforms like Oak KRD can become a home for articles, books, and research across languages.`,
      },
    ],
  },
  {
    slug: "women-entrepreneurs-erbil",
    type: "ARTICLE",
    orgSlug: "k24-demo",
    authorEmail: "desk@kurdistan24-demo.local",
    daysAgo: 4,
    variants: [
      {
        locale: "ku",
        title: "چیرۆکی ژنانێک کە بازرگانێتی بچووک لە هەولێر دەستپێدەکەن",
        summary:
          "لە کافێ و دیزاینی جلوبەرگەوە تا تەکنەلۆژیا؛ چۆن پشتگیری دارایی یارمەتی دەدات.",
        body: `لە هەولێر ژمارەیەک لە ژنان پڕۆژەی بچووکی بازرگانی دەستپێکردووە، لەوانە کافێ، دیزاینی جلوبەرگ، و خزمەتگوزاری دیجیتاڵ.

یارمەتی دارایی بچووک و ڕاهێنان لەسەر مارکێتینگ، دوو هۆکاری سەرەکین کە ئەم پڕۆژانە بەردەوام دەهێڵنەوە.`,
      },
      {
        locale: "en",
        title: "Women building small businesses in Erbil",
        summary:
          "From cafés and fashion design to tech services — how micro-support helps.",
        body: `Across Erbil, women are launching small ventures in cafés, fashion, and digital services.

Micro-finance and marketing training are two factors entrepreneurs say keep projects running.`,
      },
      {
        locale: "ar",
        title: "نساء يطلقن مشاريع صغيرة في أربيل",
        summary: "من المقاهي وتصميم الأزياء إلى الخدمات الرقمية.",
        body: `في أربيل أطلقت نساء عديدات مشاريع صغيرة في المقاهي والأزياء والخدمات الرقمية، بدعم من التمويل الصغير والتدريب.`,
      },
    ],
  },
  {
    slug: "climate-and-kurdistan-mountains",
    type: "ARTICLE",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 5,
    variants: [
      {
        locale: "ku",
        title: "گۆڕانی کەشوهەوا و کاریگەری لەسەر شاخەکانی کوردستان",
        summary:
          "کەمبوونەوەی بەفر، وشکەساڵی، و پێویستی پلانی پاراستنی ژینگە.",
        body: `شارەزایانی ژینگە هۆشداری دەدەن کە کەمبوونەوەی بەفر لە زستاندا کاریگەری لەسەر سەرچاوەی ئاو و کشتوکاڵ لە هاویندا هەیە.

پێویستە سیاسەتی دارستان، بەڕێوەبردنی ئاو، و وزەی پاک پێکەوە کاربکەن.`,
      },
      {
        locale: "en",
        title: "Climate change and Kurdistan’s mountains",
        summary:
          "Less snowfall, drought risk, and the need for environmental planning.",
        body: `Environmental specialists warn that reduced winter snowfall affects summer water supply and agriculture.

Forest policy, water management, and clean energy need to work together.`,
      },
    ],
  },
  {
    slug: "book-voices-from-zakho",
    type: "BOOK",
    isPaid: true,
    orgSlug: "naris-press",
    authorEmail: "books@naris-press.local",
    daysAgo: 6,
    variants: [
      {
        locale: "ku",
        title: "دەنگەکان لە زاخۆ",
        summary:
          "کۆمەڵە چیرۆکێک لەسەر ژیانی ڕۆژانە، سنوور، و بیرەوەری خێزانی.",
        body: `ئەم کتێبە کۆمەڵە چیرۆکێکی کورتە کە لە زاخۆ و دەوروبەری ڕۆژئاوای کوردستان ئیلهامیان وەرگرتووە.

چیرۆکەکان باس لە خێزان، کۆچ، و پێکەوەژیان دەکەن بە زمانێکی سادە و نزیک لە خوێنەر.`,
      },
      {
        locale: "en",
        title: "Voices from Zakho",
        summary:
          "A short-story collection on daily life, borders, and family memory.",
        body: `This book gathers short stories inspired by Zakho and the surrounding region.

The pieces explore family, migration, and coexistence in clear, reader-friendly prose.`,
      },
    ],
  },
  {
    slug: "ebook-learn-sorani-phrases",
    type: "EBOOK",
    isPaid: true,
    orgSlug: "naris-press",
    authorEmail: "books@naris-press.local",
    daysAgo: 7,
    variants: [
      {
        locale: "ku",
        title: "١٢٠ ڕستەی سۆرانی بۆ ڕۆژانە",
        summary: "ڕێنماییەکی کرداری بۆ فێربوونی ڕستەکانی سڵاو، بازاڕ، و گەشت.",
        body: `ئەم ئەلیکترۆنییە ١٢١ ڕستەی سۆرانی پێشکەش دەکات لەگەڵ وەرگێڕانی ئینگلیزی و تێبینی خێرا بۆ فێرخوازان.`,
      },
      {
        locale: "en",
        title: "120 Sorani phrases for everyday life",
        summary: "A practical guide to greetings, markets, and travel phrases.",
        body: `This e-book offers 120 Sorani phrases with English translations and quick tips for learners.`,
      },
    ],
  },
  {
    slug: "audiobook-mountain-letters",
    type: "AUDIOBOOK",
    isPaid: true,
    orgSlug: "naris-press",
    authorEmail: "books@naris-press.local",
    daysAgo: 8,
    variants: [
      {
        locale: "ku",
        format: "AUDIO",
        title: "نامەکانی شاخ (کتێبی دەنگی)",
        summary: "خوێندنەوەی دەنگیی نامە و بیرەوەرییەکان لەسەر ژیان لە گوندەکان.",
        body: `ئەم کتێبە دەنگییە خوێندنەوەیەکی هونەرییە بۆ کۆمەڵە نامەیەک کە باس لە ژیانی گوند و سروشتی شاخەکان دەکات.`,
      },
      {
        locale: "en",
        format: "AUDIO",
        title: "Letters from the Mountain (audiobook)",
        summary: "A narrated collection of letters and memories from village life.",
        body: `This audiobook is an artistic reading of letters about village life and mountain landscapes.`,
      },
    ],
  },
  {
    slug: "research-water-shared-basins",
    type: "RESEARCH",
    orgSlug: "naris-press",
    authorEmail: "books@naris-press.local",
    daysAgo: 9,
    variants: [
      {
        locale: "ku",
        title: "توێژینەوە: حەوزی ئاوی هاوبەش و سیاسەتی هەرێمی",
        summary:
          "شیکارییەک لەسەر هاوکاری نێوان ناوچەکان بۆ بەڕێوەبردنی سەرچاوەی ئاو.",
        body: `ئەم توێژینەوەیە سەیری مۆدێلی هاوکاری دەکات بۆ حەوزە ئاوییە هاوبەشەکان و پێشنیاری چوارچێوەیەکی سیاسەتی هەرێمی دەکات.`,
      },
      {
        locale: "en",
        title: "Research: shared water basins and regional policy",
        summary:
          "An analysis of cross-area cooperation for managing water resources.",
        body: `This paper examines cooperation models for shared water basins and proposes a regional policy framework.`,
      },
      {
        locale: "ar",
        title: "بحث: أحواض المياه المشتركة والسياسة الإقليمية",
        summary: "تحليل لسبل التعاون في إدارة الموارد المائية المشتركة.",
        body: `يتناول هذا البحث نماذج التعاون في أحواض المياه المشتركة ويقترح إطاراً سياسياً إقليمياً.`,
      },
    ],
  },
  {
    slug: "podcast-kurdistan-morning-brief",
    type: "PODCAST",
    orgSlug: "rudaw-demo",
    authorEmail: "editor@rudaw-demo.local",
    daysAgo: 0,
    variants: [
      {
        locale: "ku",
        format: "AUDIO",
        title: "پۆدکاست: پوخته‌ی بەیانی کوردستان",
        summary: "١٠ خولەک لەسەر گرنگترین هەواڵەکانی ڕۆژ بە کوردی.",
        body: `لەم ئەڵقەیەدا باس لە هەواڵی ناوخۆ، ئابووری، و کولتوور دەکرێت بە شێوەیەکی خێرا و ڕوون.`,
      },
      {
        locale: "en",
        format: "AUDIO",
        title: "Podcast: Kurdistan Morning Brief",
        summary: "Ten minutes on the day’s top stories in English.",
        body: `This episode covers local news, the economy, and culture in a short, clear format.`,
      },
    ],
  },
  {
    slug: "video-hawler-bazaar-walk",
    type: "NEWS",
    orgSlug: "k24-demo",
    authorEmail: "desk@kurdistan24-demo.local",
    daysAgo: 2,
    variants: [
      {
        locale: "ku",
        format: "VIDEO",
        title: "ڤیدیۆ: پیاسەیەک لە قەیسەری هەولێر",
        summary: "کلیپێکی ٦٠ چرکەیی لەسەر بازاڕی ناوەندی و خواردنی ناوخۆیی.",
        body: `ئەم ڤیدیۆیە پیاسەیەکی کورت پیشان دەدات لە قەیسەری هەولێر، لەگەڵ دیمەنی فرۆشیار و خواردنی نەریتی.`,
      },
      {
        locale: "en",
        format: "VIDEO",
        title: "Video: A walk through Erbil’s Qaysari bazaar",
        summary: "A 60-second clip of the central market and local food.",
        body: `This short video walks through Erbil’s Qaysari bazaar, with scenes of vendors and traditional food.`,
      },
    ],
  },
  {
    slug: "press-release-oak-krd-launch",
    type: "PRESS_RELEASE",
    orgSlug: "naris-press",
    authorEmail: "books@naris-press.local",
    daysAgo: 10,
    variants: [
      {
        locale: "ku",
        title: "بانگەشە: Oak KRD دەست بە بڵاوکردنەوەی فرەزمان دەکات",
        summary:
          "پلاتفۆڕمێکی نوێ بۆ هەواڵ، وتار، کتێب، و وەرگێڕان لە یەک شوێن.",
        body: `Oak KRD ڕایگەیاند کە قۆناغی سەرەتایی پلاتفۆڕمەکەی بۆ بڵاوکەرەوە و خوێنەران کرایەوە، بە پشتگیری زمانی کوردی، عەرەبی، و ئینگلیزی.`,
      },
      {
        locale: "en",
        title: "Press release: Oak KRD opens multilingual publishing",
        summary:
          "A new platform for news, articles, books, and translations in one place.",
        body: `Oak KRD announced the opening of its early platform for publishers and readers, with support for Kurdish, Arabic, and English.`,
      },
      {
        locale: "ar",
        title: "بيان صحفي: إطلاق Oak KRD للنشر متعدد اللغات",
        summary: "منصة جديدة للأخبار والمقالات والكتب والترجمات في مكان واحد.",
        body: `أعلنت Oak KRD عن إطلاق مرحلتها الأولى للناشرين والقراء بدعم للكردية والعربية والإنجليزية.`,
      },
    ],
  },
  {
    slug: "report-youth-employment-survey",
    type: "REPORT",
    orgSlug: "k24-demo",
    authorEmail: "desk@kurdistan24-demo.local",
    daysAgo: 11,
    variants: [
      {
        locale: "ku",
        title: "ڕاپۆرت: ڕاپرسی کار و گەنجان لە هەرێم",
        summary: "داتای سەرەتایی لەسەر بێکاری، کارامەیی، و هیوای کار لە تەکنەلۆژیا.",
        body: `ئەم ڕاپۆرتە ئەنجامی ڕاپرسییەک لە نێوان گەنجان پیشان دەدات سەبارەت بە کار، ڕاهێنان، و کەرتە پەسەندکراوەکان.`,
      },
      {
        locale: "en",
        title: "Report: youth employment survey in the region",
        summary:
          "Early data on unemployment, skills, and interest in tech jobs.",
        body: `This report presents survey results among young people on jobs, training, and preferred sectors.`,
      },
    ],
  },
];

async function main() {
  console.log("Seeding Oak KRD demo content...");

  // Clean previous demo seed (idempotent-ish)
  await prisma.mediaAsset.deleteMany();
  await prisma.contentTag.deleteMany();
  await prisma.contentVariant.deleteMany();
  await prisma.content.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.organization.deleteMany({
    where: { slug: { in: publishers.map((p) => p.org.slug) } },
  });
  await prisma.user.deleteMany({
    where: { email: { in: publishers.map((p) => p.email) } },
  });

  const passwordHash = await hash("Password123!", 10);
  const userByEmail = new Map<string, string>();
  const orgBySlug = new Map<string, string>();

  for (const pub of publishers) {
    const user = await prisma.user.create({
      data: {
        email: pub.email,
        name: pub.name,
        passwordHash,
        role: "PUBLISHER",
      },
    });
    userByEmail.set(pub.email, user.id);

    const org = await prisma.organization.create({
      data: {
        slug: pub.org.slug,
        name: pub.org.name,
        nameKu: pub.org.nameKu,
        nameAr: pub.org.nameAr,
        description: pub.org.description,
        verified: true,
        members: {
          create: { userId: user.id, role: "owner" },
        },
      },
    });
    orgBySlug.set(pub.org.slug, org.id);
  }

  for (const item of items) {
    const authorId = userByEmail.get(item.authorEmail);
    const organizationId = item.orgSlug ? orgBySlug.get(item.orgSlug) : undefined;
    const publishedAt = new Date(Date.now() - item.daysAgo * 24 * 60 * 60 * 1000);

    await prisma.content.create({
      data: {
        slug: item.slug,
        type: item.type,
        title: item.variants[0]?.title ?? item.slug,
        coverImageUrl: item.coverImageUrl,
        isPaid: item.isPaid ?? false,
        priceCents: item.isPaid ? 999 : null,
        authorId,
        organizationId,
        publishedAt,
        variants: {
          create: item.variants.map((v) => ({
            locale: v.locale,
            format: v.format ?? "TEXT",
            status: "PUBLISHED",
            title: v.title,
            summary: v.summary,
            body: v.body,
            publishedAt,
            wordCount: v.body.split(/\s+/).filter(Boolean).length,
          })),
        },
      },
    });
  }

  console.log(`Created ${publishers.length} publishers and ${items.length} content items.`);
  console.log("Demo login: editor@rudaw-demo.local / Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
