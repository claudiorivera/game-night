"use client";

import { cn } from "~/lib/cn";

export function Button({
	disabled = false,
	children,
	...buttonProps
}: React.ComponentProps<"button">) {
	return (
		<button
			type="button"
			className={cn("btn btn-secondary", {
				"btn-disabled": disabled,
			})}
			disabled={disabled}
			{...buttonProps}
		>
			{children}
		</button>
	);
}
