"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
	const router = useRouter();

	return (
		<DropdownMenuItem
			onClick={() => {
				signOut({
					fetchOptions: {
						onSuccess: router.refresh,
					},
				});
			}}
			className="cursor-pointer"
		>
			Sign Out
		</DropdownMenuItem>
	);
}
