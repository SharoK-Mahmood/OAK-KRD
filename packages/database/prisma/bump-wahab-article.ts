import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const updated = await prisma.content.updateMany({
    where: { slug: "the-rise-and-fall-of-kurdish-power-in-iraq" },
    data: { publishedAt: now },
  });
  await prisma.contentVariant.updateMany({
    where: {
      content: { slug: "the-rise-and-fall-of-kurdish-power-in-iraq" },
    },
    data: { publishedAt: now },
  });
  console.log(`Updated rows: ${updated.count}`);
  console.log(`New publishedAt: ${now.toISOString()}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
