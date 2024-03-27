import { useSession } from "next-auth/react";
import Link from "next/link";

import { userLinks } from "~/constants";

export function MainAppBar() {
	const { status } = useSession();

	const isSignedIn = status === "authenticated";

	const handleDropdownItemClick = () => {
		document.activeElement instanceof HTMLElement &&
			document.activeElement.blur();
	};

	return (
		<div className="navbar mb-4 bg-primary p-4 text-primary-content shadow">
			<div className="flex-1">
				<Link className="hover:text-primary-focus text-2xl font-bold" href="/">
					Game Night
				</Link>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end z-10">
					<div className="btn btn-circle btn-ghost" tabIndex={0} role="button">
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<ul
						// biome-ignore lint/a11y/noNoninteractiveTabindex: TODO: FIX THIS
						tabIndex={0}
						className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 text-base-content shadow"
					>
						{userLinks.map((link) => (
							<li key={link.url}>
								<Link href={link.url} onClick={handleDropdownItemClick}>
									{link.title}
								</Link>
							</li>
						))}
						{isSignedIn && (
							<li>
								<Link href="/api/auth/signout">Sign Out</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
