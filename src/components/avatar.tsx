"use client";

import {
	Avatar as _Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import type { User } from "@/server/db/types";

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
