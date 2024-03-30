"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TooltipProvider>{children}</TooltipProvider>
		</SessionProvider>
	);
}
