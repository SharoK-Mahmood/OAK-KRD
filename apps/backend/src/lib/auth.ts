import { jwtDecrypt } from "jose";
import { hkdf } from "crypto";
import { promisify } from "util";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";

const hkdfAsync = promisify(hkdf);

/** Derive the same encryption key NextAuth v4 uses for JWT cookies */
async function getNextAuthSecretKey(secret: string) {
  const length = 32;
  const keyBuffer = (await hkdfAsync(
    "sha256",
    secret,
    "",
    "NextAuth.js Generated Encryption Key",
    length,
  )) as unknown as ArrayBuffer;
  return new Uint8Array(keyBuffer);
}

export type AuthUser = {
  id: string;
  email?: string;
  name?: string;
  role?: string;
};

/**
 * Reads the NextAuth session JWT from the cookie set by the website.
 * Website and backend share NEXTAUTH_SECRET.
 */
export async function getAuthUser(c: Context): Promise<AuthUser | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  const token =
    getCookie(c, "next-auth.session-token") ??
    getCookie(c, "__Secure-next-auth.session-token");

  if (!token) return null;

  try {
    const key = await getNextAuthSecretKey(secret);
    const { payload } = await jwtDecrypt(token, key, {
      clockTolerance: 15,
    });

    const id = (payload.id as string | undefined) ?? (payload.sub as string | undefined);
    if (!id) return null;

    return {
      id,
      email: payload.email as string | undefined,
      name: payload.name as string | undefined,
      role: payload.role as string | undefined,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(c: Context): Promise<AuthUser | Response> {
  const user = await getAuthUser(c);
  if (!user) {
    return c.json({ error: "UNAUTHORIZED" }, 401);
  }
  return user;
}
