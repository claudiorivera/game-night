"use client";

import {
	type DetailedHTMLProps,
	forwardRef,
	type InputHTMLAttributes,
} from "react";
import { Input as _Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

type Props = {
	label?: string;
	errors?: Array<string>;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, errors, name, ...rest },
	ref,
) {
	return (
		<div className="flex flex-col gap-1">
			{!!label && <Label htmlFor={name}>{label}</Label>}
			<_Input
				{...rest}
				name={name}
				ref={ref}
				className={cn({
					"border-red-500": errors,
				})}
			/>
			{!!errors && (
				<div className="text-xs text-red-500">
					{errors.map((error) => (
						<div key={error}>{error}</div>
					))}
				</div>
			)}
		</div>
	);
});
