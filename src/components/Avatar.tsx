import * as _Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

import { api } from "~/lib/api";

type Props = {
	clerkId: string;
};

export const Avatar = ({ clerkId }: Props) => {
	const { data: clerkUser } = api.clerk.clerkUserById.useQuery({
		clerkId: clerkId,
	});

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<_Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-black align-middle shadow">
					<_Avatar.Image
						alt={clerkUser?.firstName ?? ""}
						className="h-full w-full rounded-[inherit] object-cover"
						src={clerkUser?.profileImageUrl}
					/>
					<_Avatar.Fallback
						className="leading-1 flex h-full w-full cursor-default items-center justify-center bg-primary text-sm font-medium text-primary-content"
						delayMs={600}
					>
						{clerkUser?.firstName?.charAt(0) || "A"}
					</_Avatar.Fallback>
				</_Avatar.Root>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="rounded bg-gray-100 px-2 py-1 text-sm"
					sideOffset={5}
				>
					{clerkUser?.firstName ?? "Anonymous"}
					<Tooltip.Arrow className="fill-gray-100" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
