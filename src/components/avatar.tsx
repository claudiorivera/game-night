"use client";

import type { User } from "next-auth";
import {
	AvatarFallback,
	AvatarImage,
	Avatar as _Avatar,
} from "~/components/ui/avatar";

export function Avatar({ user }: { user: Pick<User, "name" | "image"> }) {
	const displayName = user.name || "Anonymous";

	return (
		<_Avatar>
			<AvatarImage
				alt={`profile image for ${displayName}`}
				src={user.image || undefined}
			/>
			<AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
		</_Avatar>
	);
}
