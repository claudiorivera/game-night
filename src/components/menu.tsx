import { AlignJustifyIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { SignOutButton } from "@/components/sign-out-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SessionUser } from "@/lib/auth-client";
import { userLinks } from "@/lib/constants";

export function Menu({
	sessionUserPromise,
}: {
	sessionUserPromise: Promise<SessionUser | undefined>;
}) {
	const sessionUser = use(sessionUserPromise);

	if (!sessionUser) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AlignJustifyIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{userLinks.map((link) => (
					<DropdownMenuItem key={link.url} asChild>
						<Link href={link.url} className="cursor-pointer">
							{link.title}
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<SignOutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
