import type { Profile } from "@prisma/client";

export function renderProfileName(profile?: Profile | null) {
	switch (true) {
		case !!profile?.firstName && !!profile?.lastName:
			return `${profile.firstName} ${profile.lastName}`;
		case !!profile?.firstName:
			return profile.firstName;
		case !!profile?.username:
			return profile.username;
		default:
			return "Anonymous";
	}
}
