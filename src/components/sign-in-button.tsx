"use client";

import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { LoadingButton } from "@/components/loading-button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleSignIn = async () => {
		try {
			await authClient.signIn.email({
				email: "demo@example.com",
				password: "password1234",
				callbackURL: pathname,
			});
		} catch (error) {
			console.error(`Failed to sign in:`, error);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<LoadingButton
				onClick={() => startTransition(handleSignIn)}
				isLoading={isPending}
			>
				Sign in as demo user
			</LoadingButton>
		</div>
	);
}
