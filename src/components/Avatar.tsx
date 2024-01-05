import { type Profile } from "@prisma/client";
import * as _Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";
import { renderProfileName } from "~/lib/renderProfileName";

export function Avatar({ user }: { user: Profile }) {
	const profileName = renderProfileName(user);

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<_Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-black align-middle shadow">
					<_Avatar.Image
						alt={`profile image for ${profileName}`}
						className="h-full w-full rounded-[inherit] object-cover"
						src={user.avatarUrl || undefined}
					/>
					<_Avatar.Fallback
						className="leading-1 flex h-full w-full cursor-default items-center justify-center bg-primary text-sm font-medium text-primary-content"
						delayMs={600}
					>
						{profileName.charAt(0) || "A"}
					</_Avatar.Fallback>
				</_Avatar.Root>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="rounded bg-gray-100 px-2 py-1 text-sm"
					sideOffset={5}
				>
					{profileName}
					<Tooltip.Arrow className="fill-gray-100" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
}
