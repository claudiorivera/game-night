import { PrismaAdapter } from "@auth/prisma-adapter";
import type { GetServerSidePropsContext } from "next";
import {
	type DefaultSession,
	type NextAuthOptions,
	getServerSession,
} from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { primaryColor } from "~/constants";
import { env } from "~/env";
import { db } from "~/server/db";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & {
			id: string;
			isAdmin: boolean;
		};
	}

	interface User {
		isAdmin: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		isAdmin: boolean;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db) as Adapter,
	secret: env.AUTH_SECRET,
	theme: {
		colorScheme: "auto", // "auto" | "dark" | "light"
		brandColor: primaryColor, // Hex color code
		logo: "/android-chrome-512x512.png", // Absolute URL to image
		buttonText: "#FFFFFF", // Hex color code
	},
	providers: [
		CredentialsProvider({
			name: "Demo User",
			credentials: {},
			authorize: () =>
				db.user.findFirst({
					where: {
						isDemo: true,
					},
				}),
		}),
		DiscordProvider({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
		}),
		GitHubProvider({
			clientId: env.AUTH_GITHUB_ID,
			clientSecret: env.AUTH_GITHUB_SECRET,
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.isAdmin = user.isAdmin;
			}

			return token;
		},
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					isAdmin: token.isAdmin,
				},
			};
		},
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
