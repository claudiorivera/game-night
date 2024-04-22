"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

export function SubmitButton({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			variant="secondary"
			aria-disabled={pending}
			disabled={pending}
			className="w-full"
		>
			{children}
		</Button>
	);
}
