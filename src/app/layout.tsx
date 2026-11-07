import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/app/providers";
import { Menu } from "@/components/menu";
import { MenuSkeleton } from "@/components/menu-skeleton";
import { APP_NAME } from "@/lib/constants";
import { getSessionUser } from "@/server/api/users";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: APP_NAME,
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sessionUserPromise = getSessionUser();

	return (
		<html lang="en">
			<body
				className={cn(
					"bg-background min-h-screen font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers>
					<Toaster />
					<nav className="bg-primary text-primary-foreground flex items-center p-4 shadow-sm">
						<div className="flex-1">
							<Link className="hover:text-muted text-2xl font-bold" href="/">
								Game Night
							</Link>
						</div>

						<Suspense fallback={<MenuSkeleton />}>
							<Menu sessionUserPromise={sessionUserPromise} />
						</Suspense>
					</nav>

					<main className="container mx-auto p-4">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
