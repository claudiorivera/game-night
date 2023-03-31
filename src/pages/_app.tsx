import "../styles/globals.css";

import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import clsx from "clsx";
import { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
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

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;
	const router = useRouter();

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
				{publicPages.includes(router.pathname) ? (
					<Fragment>
						<MainAppBar />
						<Toaster />
						<div className={clsx("container mx-auto px-4", roboto.variable)}>
							<Component {...pageProps} />
						</div>
					</Fragment>
				) : (
					<Fragment>
						<SignedIn>
							<MainAppBar />
							<Toaster />
							<div className={clsx("container mx-auto px-4", roboto.variable)}>
								<Component {...pageProps} />
							</div>
						</SignedIn>
						<SignedOut>
							<RedirectToSignIn />
						</SignedOut>
					</Fragment>
				)}
			</ClerkProvider>
		</>
	);
}

export default api.withTRPC(MyApp);
