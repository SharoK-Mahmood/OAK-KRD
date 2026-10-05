# Database (`packages/database`)

Prisma schema + PostgreSQL client for Oak KRD.

- Schema: `prisma/schema.prisma`
- Client export: `src/index.ts`
- Server: Docker Compose Postgres on port **5433**

```bash
npm run db:up
npm run db:push
npm run db:generate
npm run db:studio
```
