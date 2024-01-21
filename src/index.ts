import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { DB } from "./Kysely";

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		connectionString: Bun.env.DATABASE_URL,
	}),
});

export const kyselyDb = new Kysely<DB>({
	dialect,
});

export const prismaClient = new PrismaClient();

const app = new Elysia()
	.get("/kysely", () => kyselyDb.selectFrom("settings").selectAll().execute())
	.get("/prisma", () => prismaClient.settings.findMany())
	.post("/prisma/disconnect", () => prismaClient.$disconnect())
	.post("/kysely/disconnect", () => kyselyDb.destroy())
	.post("/", () => Bun.gc(true))
	.listen(3000);

setInterval(() => {
	console.log(
		"Memory usage: ",
		Math.trunc(process.memoryUsage.rss() / 1024 / 1024),
		"MB",
	);
}, 1000);
