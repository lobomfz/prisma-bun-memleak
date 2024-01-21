# Install

1. Run `bun install`
2. Migrate with `bun prisma migrate deploy`
3. Run `bun dev` to start the server
4. Run `bun stress:prisma` and watch memory grow

# Notes

1. POST / to run GC
2. POST /prisma/disconnect to disconnect the client (none of these lower the mem usage)
3. `bun stress:kysely` works without any memory leak
4. `engineType = "binary"` in schema.prisma seems to fix the leak
