# Install

1. Run `npm install`
2. Migrate with `npx prisma migrate deploy`
3. Run `npm run dev` to start the server
4. Run `npm run stress:prisma`

# Notes

1. POST / to run GC
2. POST /prisma/disconnect to disconnect the client (none of these lower the mem usage)
3. `npm run stress:kysely` works without any memory leak
4. Leak with node seems to be minimal
