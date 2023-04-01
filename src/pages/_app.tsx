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
import { Toaster } from "react-hot-toast";

import { ConditionalWrapper, MainAppBar } from "~/components";
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

	const isProtectedPage = !publicPages.includes(router.pathname);

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
				<ConditionalWrapper
					condition={isProtectedPage}
					wrapper={(children) => (
						<>
							<SignedIn>{children}</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					)}
				>
					<MainAppBar />
					<Toaster />
					<div className={clsx("container mx-auto px-4", roboto.variable)}>
						<Component {...pageProps} />
					</div>
				</ConditionalWrapper>
			</ClerkProvider>
		</>
	);
}

export default api.withTRPC(MyApp);
