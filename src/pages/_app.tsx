import "../styles/globals.css";

import { Roboto } from "@next/font/google";
import clsx from "clsx";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
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

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;
	return (
		<>
			<Head>
				<title>Game Night</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<SessionProvider session={pageProps.session}>
				<MainAppBar />
				<Toaster />
				<div className={clsx("container mx-auto px-4", roboto.variable)}>
					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</>
	);
}

export default api.withTRPC(MyApp);
