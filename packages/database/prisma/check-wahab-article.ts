import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const a = await prisma.content.findFirst({
    where: { slug: "the-rise-and-fall-of-kurdish-power-in-iraq" },
    include: { variants: true, author: true },
  });
  console.log(
    a
      ? {
          slug: a.slug,
          type: a.type,
          publishedAt: a.publishedAt,
          cover: a.coverImageUrl,
          variants: a.variants.map((v) => ({
            locale: v.locale,
            status: v.status,
            title: v.title,
          })),
          author: a.author?.name,
        }
      : "NOT FOUND",
  );

  const arts = await prisma.content.findMany({
    where: { type: "ARTICLE", publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, publishedAt: true },
    take: 20,
  });
  console.log("\nArticles by publishedAt desc:");
  for (const x of arts) {
    console.log(`- ${x.publishedAt?.toISOString()} | ${x.slug}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
