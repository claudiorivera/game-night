"use client";

import { AlignJustify } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { APP_NAME, userLinks } from "~/lib/constants";

export function MainAppBar() {
	const { status } = useSession();

	const isSignedIn = status === "authenticated";

	return (
		<nav className="flex items-center bg-primary p-4 text-primary-foreground shadow-sm">
			<div className="flex-1">
				<Link className="hover:text-muted text-2xl font-bold" href="/">
					{APP_NAME}
				</Link>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<AlignJustify />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{userLinks.map((link) => (
						<DropdownMenuItem key={link.url} asChild>
							<Link href={link.url} className="cursor-pointer">
								{link.title}
							</Link>
						</DropdownMenuItem>
					))}
					{isSignedIn && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/api/auth/signout" className="cursor-pointer">
									Sign Out
								</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
