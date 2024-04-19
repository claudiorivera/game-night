import type { DefaultSession, NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { env } from "~/env";
import { primaryColor } from "~/lib/constants";

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

declare module "@auth/core/jwt" {
	interface JWT {
		id: string;
		isAdmin: boolean;
	}
}

export const nextAuthConfig = {
	theme: {
		colorScheme: "auto", // "auto" | "dark" | "light"
		brandColor: primaryColor, // Hex color code
		logo: "/android-chrome-512x512.png", // Absolute URL to image
		buttonText: "#FFFFFF", // Hex color code
	},
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
		jwt: ({ account, token, user, profile, session, trigger }) => {
			if (user?.id) {
				token.id = user.id;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		session: ({ session, user, newSession, token, trigger }) => {
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
} satisfies NextAuthConfig;
