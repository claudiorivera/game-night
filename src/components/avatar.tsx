import type { User } from "@prisma/client";
import * as _Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

export function Avatar({ user }: { user: Pick<User, "name" | "image"> }) {
	const displayName = user.name || "Anonymous";

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<_Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-black align-middle shadow">
					<_Avatar.Image
						alt={`profile image for ${displayName}`}
						className="h-full w-full rounded-[inherit] object-cover"
						src={user.image || undefined}
					/>
					<_Avatar.Fallback
						className="leading-1 flex h-full w-full cursor-default items-center justify-center bg-primary text-sm font-medium text-primary-content"
						delayMs={600}
					>
						{displayName.charAt(0)}
					</_Avatar.Fallback>
				</_Avatar.Root>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="rounded bg-gray-100 px-2 py-1 text-sm"
					sideOffset={5}
				>
					{displayName}
					<Tooltip.Arrow className="fill-gray-100" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
}
