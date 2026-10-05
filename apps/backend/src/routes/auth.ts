import { Hono } from "hono";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@oak-krd/database";

export const authRoutes = new Hono();

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

authRoutes.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        400,
      );
    }

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return c.json({ error: "EMAIL_EXISTS" }, 409);
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name: parsed.data.name,
        passwordHash,
        role: "PUBLISHER",
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return c.json({ user }, 201);
  } catch {
    return c.json({ error: "SERVER_ERROR" }, 500);
  }
});
