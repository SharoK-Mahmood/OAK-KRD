import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "the-rise-and-fall-of-kurdish-power-in-iraq";
const COVER = "/images/articles/rise-fall-kurdish-power-cover.jpg";

async function main() {
  const content = await prisma.content.findFirst({
    where: { slug: SLUG },
    include: { variants: true },
  });
  if (!content) throw new Error("Article not found");

  await prisma.content.update({
    where: { id: content.id },
    data: { coverImageUrl: COVER },
  });

  await prisma.mediaAsset.deleteMany({
    where: { variantId: { in: content.variants.map((v) => v.id) } },
  });

  const en = content.variants.find((v) => v.locale === "en") ?? content.variants[0];
  await prisma.mediaAsset.create({
    data: {
      variantId: en.id,
      kind: "cover",
      url: COVER,
      mimeType: "image/jpeg",
      meta: {
        alt: "Person in traditional Kurdish dress holding the Kurdistan flag over a crowded square at dusk",
      },
    },
  });

  // Keep author path current
  await prisma.user.updateMany({
    where: { email: "bilal.wahab@demo.local" },
    data: { image: "/images/articles/bilal-wahab.jpg" },
  });

  console.log(`Cover set to ${COVER} (single image)`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
