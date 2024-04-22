"use client";

import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	forwardRef,
} from "react";
import { Input as _Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import type { InferFlattenedErrors } from "~/lib/utils";

type Props = {
	label?: string;
	fieldErrors?: InferFlattenedErrors["fieldErrors"][keyof InferFlattenedErrors["fieldErrors"]];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, fieldErrors, name, ...rest },
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
					"border-red-500": fieldErrors,
				})}
			/>
			{!!fieldErrors &&
				fieldErrors.map((error) => (
					<div key={error.errorCode} className="text-xs text-red-500">
						{error.message}
					</div>
				))}
		</div>
	);
});
