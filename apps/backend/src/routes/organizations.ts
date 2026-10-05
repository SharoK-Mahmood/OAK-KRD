import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@oak-krd/database";
import { getAuthUser } from "../lib/auth.js";

export const organizationRoutes = new Hono();

const orgSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(2000).optional(),
});

organizationRoutes.post("/", async (c) => {
  const user = await getAuthUser(c);
  if (!user) return c.json({ error: "UNAUTHORIZED" }, 401);

  try {
    const body = await c.req.json();
    const parsed = orgSchema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        400,
      );
    }

    const existing = await prisma.organization.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return c.json({ error: "SLUG_EXISTS" }, 409);
    }

    const organization = await prisma.organization.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        members: {
          create: {
            userId: user.id,
            role: "owner",
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "PUBLISHER" },
    });

    return c.json({ organization }, 201);
  } catch {
    return c.json({ error: "SERVER_ERROR" }, 500);
  }
});

organizationRoutes.get("/", async (c) => {
  const user = await getAuthUser(c);
  if (!user) return c.json({ error: "UNAUTHORIZED" }, 401);

  const memberships = await prisma.organizationMember.findMany({
    where: { userId: user.id },
    include: { organization: true },
    orderBy: { createdAt: "desc" },
  });

  return c.json({
    organizations: memberships.map((m) => m.organization),
  });
});
