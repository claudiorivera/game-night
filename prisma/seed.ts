import { PrismaClient } from "@prisma/client";
import { seed } from "~/lib/seed";

const db = new PrismaClient();

try {
	await seed(db);
} catch (error) {
	console.error(error);
} finally {
	await db.$disconnect();
}
