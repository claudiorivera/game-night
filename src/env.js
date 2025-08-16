import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_SECRET_KEY: z.string(),
		AUTH_DISCORD_SECRET: z.string(),
		AUTH_DISCORD_ID: z.string(),
		AUTH_GITHUB_SECRET: z.string(),
		AUTH_GITHUB_ID: z.string(),
		AUTH_SECRET: z.string(),
		DATABASE_URL: z.url(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		API_SECRET_KEY: process.env.API_SECRET_KEY,
		AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
		AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
		AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
		AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
		AUTH_SECRET: process.env.AUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
	emptyStringAsUndefined: true,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
