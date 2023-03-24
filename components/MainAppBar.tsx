import Link from "next/link";
import { useSession } from "next-auth/react";

import { userLinks } from "~/config";

export function MainAppBar() {
  const { data } = useSession();

  function handleDropdownItemClick() {
    document.activeElement instanceof HTMLElement &&
      document.activeElement.blur();
  }

  return (
    <div className="navbar mb-4 bg-primary p-4 text-primary-content shadow">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold hover:text-primary-focus">
          Game Night
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content shadow"
          >
            {userLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url} onClick={handleDropdownItemClick}>
                  {link.title}
                </Link>
              </li>
            ))}
            {!!data && (
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
