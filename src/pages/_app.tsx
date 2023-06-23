import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { type AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { MainAppBar } from "~/components";
import { api } from "~/lib/api";

export const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
	variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Game Night</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ClerkProvider {...pageProps}>
				<MainAppBar />
				<Toaster />
				<div className={clsx("container mx-auto px-4", roboto.variable)}>
					<Component {...pageProps} />
				</div>
			</ClerkProvider>
		</>
	);
}

export default api.withTRPC(MyApp);
