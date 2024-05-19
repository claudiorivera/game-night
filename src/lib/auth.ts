import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { db } from "~/db";
import * as schema from "~/db/schema";
import { env } from "~/env";
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			isAdmin: boolean;
		} & DefaultSession["user"];
	}
}

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: DrizzleAdapter(db, schema) as Adapter,
	providers: [
		DiscordProvider({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
		}),
		GitHubProvider({
			clientId: env.AUTH_GITHUB_ID,
			clientSecret: env.AUTH_GITHUB_SECRET,
		}),
	],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
});
