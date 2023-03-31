import Image from "next/image";

import { api } from "~/lib/api";

type Props = {
	clerkId: string;
};

export const Avatar = ({ clerkId }: Props) => {
	const { data: clerkUser } = api.clerk.clerkUserById.useQuery({
		clerkId: clerkId,
	});

	if (!clerkUser) return null;

	return (
		<div className="tooltip" data-tip={clerkUser.firstName}>
			{clerkUser.profileImageUrl ? (
				<div className="avatar">
					<div className="relative h-10 w-10 rounded-full">
						<Image
							src={clerkUser.profileImageUrl}
							width={960}
							height={960}
							alt={clerkUser.firstName ?? ""}
							className="object-cover"
						/>
					</div>
				</div>
			) : (
				<div className="placeholder avatar">
					<div className="w-10 rounded-full">
						{clerkUser.firstName?.charAt(0)}
					</div>
				</div>
			)}
		</div>
	);
};
