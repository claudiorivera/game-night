import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy } from "better-auth/plugins/oauth-proxy";
import { env } from "@/env.mjs";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	plugins: [oAuthProxy()],
	emailAndPassword: {
		enabled: true,
	},
	secret: env.BETTER_AUTH_SECRET,
	logger: {
		level: process.env.NODE_ENV === "development" ? "debug" : "info",
	},
	trustedOrigins: process.env.VERCEL_URL
		? [`https://${process.env.VERCEL_URL}`]
		: [],
	user: {
		additionalFields: {
			role: {
				type: "string",
				input: false,
				default: schema.Role.user,
			},
		},
	},
});
