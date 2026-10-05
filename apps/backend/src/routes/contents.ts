import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@oak-krd/database";
import { getAuthUser } from "../lib/auth.js";

export const contentRoutes = new Hono();

const contentSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum([
    "NEWS",
    "ARTICLE",
    "BOOK",
    "EBOOK",
    "AUDIOBOOK",
    "PRESS_RELEASE",
    "REPORT",
    "RESEARCH",
    "PODCAST",
    "GALLERY",
  ]),
  organizationId: z.string().cuid().optional(),
  locale: z.enum(["ku", "ar", "en"]).default("ku"),
  body: z.string().min(1),
  summary: z.string().max(2000).optional(),
  publish: z.boolean().optional(),
});

function slugifyFallback(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

contentRoutes.post("/", async (c) => {
  const user = await getAuthUser(c);
  if (!user) return c.json({ error: "UNAUTHORIZED" }, 401);

  try {
    const body = await c.req.json();
    const parsed = contentSchema.safeParse({
      ...body,
      slug: body.slug || slugifyFallback(body.title ?? ""),
    });

    if (!parsed.success) {
      return c.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        400,
      );
    }

    const data = parsed.data;

    if (data.organizationId) {
      const membership = await prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: data.organizationId,
            userId: user.id,
          },
        },
      });

      if (!membership) {
        return c.json({ error: "FORBIDDEN" }, 403);
      }
    }

    const isPaid = ["BOOK", "EBOOK", "AUDIOBOOK"].includes(data.type);
    const now = data.publish ? new Date() : null;

    const content = await prisma.content.create({
      data: {
        title: data.title,
        slug: data.slug,
        type: data.type,
        isPaid,
        authorId: user.id,
        organizationId: data.organizationId,
        publishedAt: now,
        variants: {
          create: {
            locale: data.locale,
            format: "TEXT",
            status: data.publish ? "PUBLISHED" : "DRAFT",
            title: data.title,
            summary: data.summary,
            body: data.body,
            publishedAt: now,
            wordCount: data.body.split(/\s+/).filter(Boolean).length,
          },
        },
      },
      include: { variants: true },
    });

    return c.json({ content }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "SERVER_ERROR" }, 500);
  }
});

contentRoutes.get("/", async (c) => {
  const contents = await prisma.content.findMany({
    where: { publishedAt: { not: null } },
    include: {
      variants: {
        where: { status: "PUBLISHED" },
        select: {
          id: true,
          locale: true,
          format: true,
          title: true,
          summary: true,
        },
      },
      author: { select: { id: true, name: true } },
      organization: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return c.json({ contents });
});
