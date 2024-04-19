import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "~/app/providers";
import { MainAppBar } from "~/components/main-app-bar";
import { cn } from "~/lib/cn";
import "~/styles/globals.css";

export const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Game Night",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Toaster />
					<MainAppBar />
					<main
						className={cn(
							"container mx-auto p-4 min-h-screen",
							roboto.variable,
						)}
					>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
