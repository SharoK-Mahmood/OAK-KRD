import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "the-rise-and-fall-of-kurdish-power-in-iraq";
const COVER = "/images/articles/rise-fall-kurdish-power-cover.jpg";
const AUTHOR_PHOTO = "/images/articles/bilal-wahab.jpg";

const enTitle = "The Rise and Fall of Kurdish Power in Iraq";
const enSubtitle = "by Bilal Wahab · Spring 2023";
const enSummary =
  "Despite thirty years of landmark achievements, the KRG’s endless quest for economic independence has only entrenched its internal divisions and kleptocracy while shifting its dependency—from Iraq to Turkey, and from foreign aid to oil revenues.";
const enBody = `Despite thirty years of landmark achievements, the KRG’s endless quest for economic independence has only entrenched its internal divisions and kleptocracy while shifting its dependency—from Iraq to Turkey, and from foreign aid to oil revenues.

If the 1991 Gulf War led to the birth of the Kurdistan Regional Government, the US invasion in 2003 propelled it into the future. At the start of the invasion, Iraqi Kurdistan served as the northern front of the war, elevating the status of the Kurdistan Regional Government (KRG). The destruction of President Saddam Hussein’s Baathist regime buttressed Kurdish rights and enabled their political and economic power to grow. Compared to the violence and sectarian strife that befell the rest of the country under the US-led occupation, the Kurdistan Region of Iraq was held up by the US pundit class as a “safe haven” and “island of decency”—a narrative the KRG encouraged with a public relations campaign describing Kurdistan as “the Other Iraq.”

2003 brought with it a unity of purpose among Iraq’s Kurdish parties. They capitalized on their longstanding relationship with the United States and Britain, the primary enforcers of the no-fly zone following the first Gulf War and the two major proponents of regime change in 2003. Although differences persisted, Kurdish parties spoke in unison in Baghdad, particularly in the early years following the invasion. They worked to enshrine their new powers and rights into Iraq’s 2005 constitution, which recognized Kurdistan as an official region and granted the KRG power to govern largely independently of Baghdad. Kurdish parties also fully supported the 2005 parliamentary elections. As a result of these efforts, they gained a significant influence within the Iraqi state. Kurdish members of parliament form a significant block that often makes or breaks governments and legislation. In the muhassasa system—the informal but persistent practice of ethno-sectarian division of top jobs—Iraq has only had Kurdish presidents since 2006. Ethnic Kurds have on occasion served as deputy parliament speakers and led key ministries such as finance and foreign affairs.

But working within the state apparatus has confused the Kurdish role in Baghdad. On the one hand, the KRG has sought the greatest possible share of the state’s powers and revenues. On the other, given historical Kurdish fears of a strong central government, they have also invested in their ability to secede, exemplified by the referendum for independence in 2017. Today, Iraqi Kurdistan faces external challenges, most notably a legal and financial squeeze by Baghdad’s federal government and threats of Iranian and Turkish attacks. The real threat to the KRG is not external, however. Thirty years after its founding and 20 years on from the US invasion, the KRG—as if going through a mid-life crisis—lacks a clear vision for its future. Amid the threat of losing relevance, it stares at implosion due to economic uncertainties, chronic internal divisions and weak institutions.

Finding Wealth
Kurds in Iraq have long based their struggle for self-rule on their grievances as a persecuted ethnic minority. Kurdish rulers gained legitimacy by standing up for Kurdish rights. Following the first Gulf War and the 1992 elections, however, such revolutionary credit gave way to democratic legitimacy. The elections gave birth to the KRG and brought two parties, the Patriotic Union of Kurdistan (PUK) and the Kurdistan Democratic Party (KDP), to formal political power. Since then, each of the two major Kurdish parties has remained inextricably associated with a family—the Talabani family lead the PUK, and the Barzani family the KDP (their second and third generations, respectively, are currently at the helm of power).

The civil war in Iraqi Kurdistan between 1994 and 1998 discredited both parties, dividing the region into two single-party fiefdoms that persist until today. Meanwhile, over the course of the past two decades, as a new generation of each ruling family took on the mantle of leadership, their legitimacy has lacked both revolutionary and democratic standing. Economic development emerged as an alternative.

Indeed, between 2004 and 2014, the KRG translated post-invasion opportunities into an economic boom. A construction frenzy in this period caused the capital city of Erbil to more than double in size. The KRG says it has rebuilt 65 percent of rural Kurdistan that was destroyed during the Anfal campaign of ethnic cleansing in 1988. Two of Iraq’s three national cell phone companies are headquartered in Kurdistan, and the region is also home to a slew of hotels, gated communities and private schools, including two American-style universities.

By 2005, the KRG had built two international airports, in Sulaymaniyah and Erbil, unshackling the landlocked region. Foreign visitors could obtain visas upon arrival, a policy that the Iraqi government did not adopt until 2021. Mass public hiring decreased unemployment, although foreign laborers filled much of the skills gap. Furthermore, a 2006 investment law, which offered investors perks such as land ownership, tax holidays and profit repatriation, helped the KRG attract significant local and foreign capital. Today, there are over 3,000 foreign companies registered in the region. On the diplomatic front, the KRG hosts 42 consulates and maintains 14 representation offices around the world.

Making the most of its geographic location and security, Iraqi Kurdistan has become an important regional trade route and destination. Turkey, whose only land border with Iraq goes through the Kurdistan region, is the KRG’s largest trading partner. In 2017, the volume of trade between Turkey and Iraqi Kurdistan was $2.5 billion, representing nearly one third of Ankara’s overall trade with Iraq. Similarly, one third of Iraq’s imports from Iran—an estimated $2.4 billion a year—are to Iraqi Kurdistan. Moreover, 50 percent of Iran’s exports to Iraq pass through border crossings controlled by the KRG.

From Foreign Aid to Oil Federalism
The federal system proposed in the 2005 constitution granted the KRG a significant role in managing the oil and gas resources of the region. These provisions served as a safeguard: Should the new Iraq fail, it would be possible for an economically independent Kurdistan to take the next step toward statehood, the penultimate nationalist dream.

The constitution envisioned a system of petro-federalism, in which the federal Iraqi government and the KRG would share responsibility over oil policy and revenue. But in the years since its ratification, the Iraqi parliament has consistently failed to pass a national hydrocarbon law that would regulate the energy sector and define these joint roles.

Acting proactively, the Kurdish parliament passed its own natural resources law in 2007 and started inking some 55 contracts with international oil companies. While the federal government maintained that this law was unconstitutional and the oil contracts illegal, the KRG pushed ahead. It adopted production-sharing contracts, an industry favorite, which allowed international oil companies a stake in the region’s petroleum assets. This “smaller, faster, lighter” approach, as Deputy Prime Minister Qubad Talabani put it in a 2012 interview with the author, helped jumpstart the Kurdish energy industry. Small firms, or wildcatters, came first, but Big Oil soon followed. In 2011 and 2012 ExxonMobil and Chevron each signed exploration contracts with the KRG, materially boosting the legal standing of its energy industry.

The KRG asked for neither permission nor forgiveness from Baghdad, an approach that in many ways paid off. By mid-2022, the KRG was producing nearly 450,000 barrels of oil per day, most of it exported via the region’s independent pipeline through Turkey. In the second quarter of 2022 alone, Iraqi Kurdistan’s oil sales earned $3.77 billion in gross revenues. While only 41 percent of these revenues made it into KRG coffers (the rest was dedicated to paying the oil sector’s costs as well as servicing its debts) the KRG still reaped $1.57 billion. As for natural gas, the KRG’s marketed natural gas production stood at about 5.3 billion cubic meters per year in 2021.

The payoffs, however, have come with a cost. The federal government’s claim on Kurdish oil has forced the KRG to sell at a political risk discount. Furthermore, disputes between Erbil and Baghdad over oil and customs revenues boiled over in 2014, leading Baghdad to cut off the KRG’s share of the national budget. In 2022, the Iraqi Federal Supreme Court formally ruled that the KRG’s natural resource law was unconstitutional and its oil contracts and exports illegal. The Iraqi government had also sued Turkey in international arbitration courts over allowing the KRG to use the Iraq-Turkey pipeline without Baghdad’s approval. At the time of writing, the court favored Iraq’s position, compelling Turkey to halt the KRG’s oil exports. The future of the KRG’s independent energy industry remains uncertain.

Intent on more independence from Baghdad, the KRG has grown dependent on other entities and factors beyond its control, including global oil prices, the dollar-dinar exchange rate and Turkey, through which its pipeline passes. The vulnerabilities of this system started to show in 2014, when the expansion of ISIS caused international oil companies to either withdraw or suspend planned developments. The KRG made up for the losses by taking over Kirkuk’s oil fields following the Iraqi army’s retreat, which doubled the KRG’s crude exports to 550,000 barrels per day. But these gains were hampered by falling oil prices. Per barrel, oil prices fell from a peak of $115 in June 2014 to $70 in December and to $35 by February 2016. Deputy Prime Minister Qubad Talabani described the KRG’s dire financial situation at the time as an “economic tsunami.” A telling manifestation of lost confidence in the KRG has been a renewed wave of migration to Europe. As a result of these factors, among others, by 2021 the KRG faced a debt of $31.6 billion.

Internal Divisions and Institutional Weakness
In recent years, fissures have cropped up among Iraqi Kurdistan’s ruling families, who have grown in prominence as the region’s political parties have weakened. After PUK founder Jalal Talabani passed away in 2017 his eldest son and nephew together took the reins of the party as co-presidents. In 2021, a feud broke out between the cousins, Bafel and Lahur Talabani, and the former ousted the latter. Meanwhile, on the Barzani side a power struggle is brewing between two Barzani cousins, which has the potential to disrupt not only the cohesion of the KDP but the entire regional government. These internecine struggles reflect broader institutional weaknesses and democratic regression in the Kurdistan region.

As an example, KRG institutions were brittle and completely unprepared to weather the “economic tsunami” that began in 2014. The last time the KRG parliament had passed a budget was in 2012. The public sector had swelled uncontrollably, crowding out private sector jobs. By 2017, the KRG was the largest employer in Kurdistan, employing half of the labor force, roughly 1.4 million people, to the tune of $750 million a month. Corruption and inefficiency have marred public sector employment, with thousands of ghost employees, double dippers and undeserved pensioners, while the budding private sector owes its existence to holding companies owned or controlled by members of Kurdistan’s ruling families. To avoid showing its hand to Baghdad, the KRG energy industry has become increasingly opaque and unaccountable.

The Peshmerga enjoy influence and prestige and have continued to garner significant public and political support, especially during their partnership with the US-led anti-ISIS coalition, but the cavernous political rift between the PUK and KDP has decreased the Kurdistan region’s value to the United States as a partner and diminished Kurdish leverage in Baghdad. There is no accurate accounting available, but the number of Peshmerga fighters is estimated to range between 160,000 to double that number. Prime Minister Masrour Barzani admitted that the Peshmerga forces have more generals among their ranks than either the US or Chinese military. Ever since the war against ISIS, the United States has provided stipends and training to Peshmerga units in exchange for the promise that the Peshmerga will be unified under the command of the KRG rather than its ruling parties. But the KDP and PUK refuse to surrender control of their respective units—a stance that Iraq’s Popular Mobilization Forces have cited in their own snubbing of national authority.

Overall, the KRG’s reputation for valuing democracy and human rights has eroded in the years since 2003. Due to civil war and internal divisions in the 1990s, the region’s second parliamentary elections were not held until 2005, 13 years after the first election. Subsequent elections have taken place only following significant delays. Electoral victory and power are increasingly out of sync in the region. When the unarmed opposition party, Gorran, came in second in the 2009 elections, ahead of the PUK, the two ruling parties did not allow Gorran to share in power. Although President Masoud Barzani’s term ended in 2015, he only left office in 2017, effectively shutting down the Kurdish parliament for two years in order to extend his tenure. No wonder turnout has been steadily declining at Kurdish elections.

The KRG’s Future
Despite a persistent narrative of grievances and victimhood, Iraqi Kurds have exercised significant power and agency during the past three decades. KRG leaders continue to seek more power and autonomy, but to what end? Although they rebounded after decades of war, genocide and neglect, post-invasion Kurdish politics has not managed to shake off chronic internal divisions. The region’s most advanced institutions that could potentially support an independent Kurdistan remain its economy and Peshmerga forces.

While the KRG has wielded economic policy to shift toward political independence, they have yet to produce a viable economic model. Indeed, despite 30 years of successfully managing a regional economy, the endless quest for economic independence has only ended up shifting dependency from Iraq to Turkey or from foreign aid to oil revenues. The ad hoc economic policy that has slowly emerged, like a Polaroid photo, over the past two decades displays traits of socialism, free markets and kleptocracy. Access to power and wealth, meanwhile, remains anchored to politics, not to economic activity.

The 2017 independence referendum, called for by then-President Barzani, tested the Kurdistan region’s military and economic assets. Neither the international community nor the KRG’s neighbors could stomach redrawing the borders of the Middle East, and the KRG was not ready to withstand the economic and political costs of its push to secede from Iraq. The referendum and its aftermath cost the KRG the gains it had made following the ISIS invasion of 2014, including Kirkuk and its oilfields, which were reclaimed by Iraqi military and Popular Mobilization Forces after an armed encounter with the Peshmerga. Most damaging, however, was the clarity it bestowed on a hitherto ambiguous question: Can the KRG become an independent state?

As Kurdish divisions deepen and security in the rest of Iraq improves, the balance of power that once favored the KRG is shifting in Baghdad’s favor. Since the referendum, KRG leaders disagree on visions for their position within Iraq and on plans to save their embattled energy sector. Should the Kurdish economy remain hinged on foreign aid, oil and budget transfers from Baghdad, or can it build a robust economy through reform and diversification? These are among the questions raised over the past 20 years. Whether and how they are answered will determine the Kurdistan Region’s future.

—
About the author: Bilal Wahab was the Nathan and Esther K. Wagner Senior Fellow at The Washington Institute. Spring 2023.`;

const kuTitle = "سەرهەڵدان و داڕمانی هێزی کورد لە عێراق";
const kuSubtitle = "بەڵاڵ وەهاب · بەهاری ٢٠٢٣ · The Rise and Fall of Kurdish Power in Iraq";
const kuSummary =
  "سەرەڕای سی ساڵ دەستکەوتی مێژوویی، گەڕانی بەردەوامی حکومەتی هەرێم بۆ سەربەخۆیی ئابووری تەنها دابەشبوونی ناوخۆیی و گەندەڵی قووڵتر کردووە و وابەستەیی گۆڕیوە — لە عێراقەوە بۆ تورکیا، و لە یارمەتی بیانییەوە بۆ داهاتی نەوت.";
const kuBody = `سەرەڕای سی ساڵ دەستکەوتی مێژوویی، گەڕانی بەردەوامی حکومەتی هەرێمی کوردستان (هەولێر) بۆ سەربەخۆیی ئابووری تەنها دابەشبوونی ناوخۆیی و گەندەڵی قووڵتر کردووە و وابەستەیی گۆڕیوە — لە عێراقەوە بۆ تورکیا، و لە یارمەتی بیانییەوە بۆ داهاتی نەوت.

ئەگەر جەنگی کەنداوی ١٩٩١ بووە هۆی لەدایکبوونی حکومەتی هەرێم، داگیرکاری ئەمریکا لە ٢٠٠٣ پاڵی پێوەنا بۆ داهاتوو. کوردستانی عێراق بوو بە بەرەی باکووری جەنگ و پێگەی هەرێم بەرز بووەوە. لە بەرامبەر توندوتیژییەکانی بەغدا، کوردستان وەک «پەناگەیەکی سەلامەت» و «دوورگەیەکی شایستە» پیشان درا — «عێراقی دیکە».

یەکگرتوویی مەبەست لە ٢٠٠٣: پارتی کوردستان لە بەغدا بە یەک دەنگ قسەیان دەکرد و مافەکانیان لە دەستووری ٢٠٠٥ جێگیر کرد — ناسینەوەی هەرێم و دەسەڵاتی نیمچەسەربەخۆ. لە سیستەمی موحاسەسەدا، لە ٢٠٠٦ەوە تەنها سەرۆککۆماری کورد هەبووە.

بەڵام ڕۆڵی کورد لە بەغدا دووپەلە: داوای زیاترین دەسەڵات و داهات، لەگەڵ ئامادەکاری بۆ جیاکردنەوە (ڕیفراندۆمی ٢٠١٧). ئەمڕۆ هەڕەشەی دەرەکی هەیە — گوشاری یاسایی و دارایی بەغدا، هێرشی ئێران و تورکیا — بەڵام هەڕەشەی ڕاستەقینە ناوخۆییە: نەبوونی دیدگای ڕوون، نادڵنیایی ئابووری، دابەشبوون، و دامەزراوەی لاواز.

دۆزینەوەی سامان
دوای هەڵبژاردنی ١٩٩٢، پەدەکە و یەنەکە هاتنە دەسەڵات — هەر یەکەیان بە خێزانێکەوە بەستراوەتەوە (بارزانی و تاڵەبانی). جەنگی ناوخۆیی ١٩٩٤–١٩٩٨ هەرێمی کردە دوو فایفدۆم. لە ٢٠٠٤–٢٠١٤ بۆمی ئابووری: هەولێر دوو هێندە گەورە بوو، دوو فڕۆکەخانە، یاسای وەبەرهێنانی ٢٠٠٦، زیاتر لە ٣٠٠٠ کۆمپانیای بیانی، ٤٢ کونسوڵخانە. تورکیا گەورەترین هاوبەشی بازرگانییە.

لە یارمەتی بیانییەوە بۆ فیدراڵیزمی نەوت
دەستووری ٢٠٠٥ پێشنیاری بەشداریی نەوتی کرد، بەڵام یاسای نیشتمانیی نەوت تێپەڕ نەبوو. پەرلەمانی کوردستان یاسای خۆی لە ٢٠٠٧ دەرکرد و نزیکەی ٥٥ گرێبەستی واژۆ کرد. تا ناوەڕاستی ٢٠٢٢ نزیکەی ٤٥٠ هەزار بەرمیل لە ڕۆژێکدا بەرهەم دەهێنرا. لە ٢٠٢٢ دادگای باڵای فیدراڵی یاسای نەوتی هەرێمی بە نادەستووری دانا و دواتر هەناردە ڕاگیرا. وابەستەیی گۆڕا بۆ نرخی نەوت، دینار، و تورکیا. دوای ٢٠١٤ «تسونامی ئابووری» و قەرزی ٣١٫٦ ملیار دۆلار تا ٢٠٢١.

دابەشبوونی ناوخۆیی و لاوازی دامەزراوەکان
ناکۆکیی نێوان خێزانە دەسەڵاتدارەکان، فەشەلی بودجە (دوایین بودجە ٢٠١٢)، ١٫٤ ملیۆن فەرمانبەر، گەندەڵی، و پێشمەرگەی دوولایەنە. دیموکراسی و مافی مرۆڤ لاواز بوونەتەوە؛ دەنگدان دواکەوتووە و بەشداری کەم بووەتەوە.

داهاتووی هەرێم
گەڕان بۆ سەربەخۆیی ئابووری تەنها وابەستەیی گۆڕیوە. ڕیفراندۆمی ٢٠١٧ تاقی کردەوە: کۆمەڵگای نێودەوڵەتی و دراوسێکان سنووری نوێیان قبوڵ نەکرد؛ کەرکووک و کێڵگە نەوتییەکان لەدەست چوون. پرسیار ئەوەیە: ئابووری لەسەر یارمەتی، نەوت، و بودجەی بەغدا دەمێنێتەوە، یان چاکسازی و فرەچەشنی؟ وەڵامەکان داهاتووی هەرێم دیاری دەکەن.

—
دەربارەی نووسەر: بەڵاڵ وەهاب (Bilal Wahab) هاوکارێکی باڵای پێشووی پەیمانگای واشنتۆن بوو (Nathan and Esther K. Wagner Senior Fellow). بەهاری ٢٠٢٣.`;

async function main() {
  let author = await prisma.user.findUnique({
    where: { email: "bilal.wahab@demo.local" },
  });
  if (!author) {
    author = await prisma.user.create({
      data: {
        email: "bilal.wahab@demo.local",
        name: "Bilal Wahab",
        image: AUTHOR_PHOTO,
        bio: "Nathan and Esther K. Wagner Senior Fellow (formerly), The Washington Institute.",
        role: "PUBLISHER",
      },
    });
  } else {
    author = await prisma.user.update({
      where: { id: author.id },
      data: { name: "Bilal Wahab", image: AUTHOR_PHOTO },
    });
  }

  const org = await prisma.organization.findUnique({
    where: { slug: "rudaw-demo" },
  });
  if (!org) {
    throw new Error("Run npm run db:seed first so publishers exist.");
  }

  const existing = await prisma.content.findFirst({ where: { slug: SLUG } });
  if (existing) {
    await prisma.contentVariant.deleteMany({ where: { contentId: existing.id } });
    await prisma.content.delete({ where: { id: existing.id } });
  }

  // Use "now" so it surfaces first in Articles / Latest (Spring 2023 kept in subtitle)
  const publishedAt = new Date();
  const content = await prisma.content.create({
    data: {
      slug: SLUG,
      type: "ARTICLE",
      title: enTitle,
      subtitle: enSubtitle,
      coverImageUrl: COVER,
      isPaid: false,
      authorId: author.id,
      organizationId: org.id,
      publishedAt,
      variants: {
        create: [
          {
            locale: "en",
            format: "TEXT",
            status: "PUBLISHED",
            title: enTitle,
            summary: enSummary,
            body: enBody,
            publishedAt,
            wordCount: enBody.split(/\s+/).filter(Boolean).length,
            assets: {
              create: [
                {
                  kind: "cover",
                  url: COVER,
                  mimeType: "image/jpeg",
                  meta: {
                    alt: "Person in traditional Kurdish dress holding the Kurdistan flag over a crowded square at dusk",
                  },
                },
              ],
            },
          },
          {
            locale: "ku",
            format: "TEXT",
            status: "PUBLISHED",
            title: kuTitle,
            summary: kuSummary,
            body: kuBody,
            publishedAt,
            wordCount: kuBody.split(/\s+/).filter(Boolean).length,
          },
        ],
      },
    },
  });

  console.log(`Added article: ${content.slug}`);
  console.log(`EN: /en/c/${content.slug}`);
  console.log(`KU: /ku/c/${content.slug}`);
  console.log(`Articles: /ku/browse/articles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
