// https://github.com/WebDevSimplified/permission-system/issues/1#issue-2709020454

import z4 from "zod/v4";
import type { SessionUser } from "@/lib/auth-client";
import { Role } from "@/server/db/schema";
import type { Event } from "@/server/db/types";

type Permissions = {
	deleteEvent: (event: Event) => boolean;
	editEvent: (event: Event) => boolean;
};

type PermissionsFactoryMap = {
	[role in keyof typeof Role]: (user: SessionUser) => Permissions;
};

const permissionsFactoryMap: PermissionsFactoryMap = {
	admin: () => ({
		deleteEvent: () => true,
		editEvent: () => true,
	}),
	user: (user: SessionUser) => ({
		deleteEvent: (event) => event.hostId === user.id,
		editEvent: (event) => event.hostId === user.id,
	}),
	demo: () => ({
		deleteEvent: () => false,
		editEvent: () => false,
	}),
};

export function can(user: SessionUser): Permissions {
	const role = z4.enum(Role).parse(user.role);

	const userRolePermission = permissionsFactoryMap[role](user);

	return new Proxy({} as Permissions, {
		get(_target, action: keyof Permissions) {
			// biome-ignore lint/suspicious/noExplicitAny: required for accepting any entity type
			return (data: any) => userRolePermission[action](data);
		},
	});
}
