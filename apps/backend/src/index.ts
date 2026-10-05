import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { authRoutes } from "./routes/auth.js";
import { organizationRoutes } from "./routes/organizations.js";
import { contentRoutes } from "./routes/contents.js";

const app = new Hono();

const websiteOrigin = process.env.WEBSITE_URL ?? "http://localhost:3000";
const port = Number(process.env.PORT ?? 4000);

app.use(
  "*",
  cors({
    origin: [websiteOrigin, "http://localhost:3000"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "oak-krd-backend" }));

app.route("/auth", authRoutes);
app.route("/organizations", organizationRoutes);
app.route("/contents", contentRoutes);

console.log(`Oak KRD backend listening on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
