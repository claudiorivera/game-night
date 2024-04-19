"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="btn btn-secondary w-full"
			aria-disabled={pending}
			disabled={pending}
		>
			{children}
		</button>
	);
}
