"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
	const pathname = usePathname();

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
			<Button onClick={handleSignIn}>Sign In as Demo User</Button>
		</div>
	);
}
