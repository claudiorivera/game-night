import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.mjs";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/server/db/schema.ts",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
});
