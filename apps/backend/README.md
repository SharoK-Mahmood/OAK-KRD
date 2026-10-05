# Backend (`apps/backend`)

**API server** for Oak KRD — Hono on Node.

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | no |
| POST | `/auth/register` | no |
| GET/POST | `/organizations` | yes |
| GET/POST | `/contents` | GET public / POST yes |

Used by the website today and by the mobile app later.

Run: `npm run dev:backend` → http://localhost:4000
