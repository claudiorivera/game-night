"use client";

import {
	QueryClient,
	QueryClientProvider,
	isServer,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "~/components/ui/tooltip";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	}

	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

export function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<SessionProvider>
			<TooltipProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</TooltipProvider>
		</SessionProvider>
	);
}
