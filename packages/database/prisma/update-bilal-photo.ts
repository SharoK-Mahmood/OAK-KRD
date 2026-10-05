import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const u = await prisma.user.update({
    where: { email: "bilal.wahab@demo.local" },
    data: {
      image: "/images/articles/bilal-wahab.jpg",
      bio: "Nathan and Esther K. Wagner Senior Fellow (formerly) at The Washington Institute.",
    },
  });
  console.log(`Updated ${u.name} → ${u.image}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
