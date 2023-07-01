import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

import { userLinks } from "~/constants";

export const MainAppBar = () => {
	const { signOut } = useClerk();

	const handleDropdownItemClick = () => {
		document.activeElement instanceof HTMLElement &&
			document.activeElement.blur();
	};

	return (
		<div className="navbar mb-4 bg-primary p-4 text-primary-content shadow">
			<div className="flex-1">
				<Link className="text-2xl font-bold hover:text-primary-focus" href="/">
					Game Night
				</Link>
			</div>
			<div className="flex-none">
				<div className="dropdown-end dropdown z-10">
					<label className="btn-ghost btn-circle btn" tabIndex={0}>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</label>
					<ul
						className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content shadow"
						tabIndex={0}
					>
						{userLinks.map((link) => (
							<li key={link.url}>
								<Link href={link.url} onClick={handleDropdownItemClick}>
									{link.title}
								</Link>
							</li>
						))}
						<li>
							<button onClick={() => void signOut()}>Sign Out</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
