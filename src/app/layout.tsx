import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "~/app/providers";
import { MainAppBar } from "~/components/main-app-bar";
import { APP_NAME } from "~/lib/constants";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: APP_NAME,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers>
					<Toaster />
					<MainAppBar />
					<main className="container mx-auto p-4">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
