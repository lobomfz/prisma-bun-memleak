import { PrismaClient } from "@prisma/client";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { DB } from "./Kysely";
import HyperExpress from "hyper-express";
import "dotenv/config";

const app = new HyperExpress.Server();

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		connectionString: process.env.DATABASE_URL,
	}),
});

export const kyselyDb = new Kysely<DB>({
	dialect,
});

export const prismaClient = new PrismaClient();

app.get("/prisma", async (req, res) => {
	const settings = await prismaClient.settings.findMany();

	res.json(settings);
});

app.get("/kysely", async (req, res) => {
	const settings = await kyselyDb
		.selectFrom("settings")
		.selectAll()
		.execute();
	res.json(settings);
});

app.post("/", async (req, res) => {
	if (global.gc) global.gc();

	res.send("ok");
});

app.post("/prisma/disconnect", async (req, res) => {
	await prismaClient.$disconnect();

	res.send("ok");
});

app.post("/kysely/disconnect", async (req, res) => {
	await kyselyDb.destroy();

	res.sendStatus(200);
});

app.listen(3000);

setInterval(() => {
	console.log(
		"Memory usage: ",
		Math.trunc(process.memoryUsage.rss() / 1024 / 1024),
		"MB",
	);
}, 1000);
