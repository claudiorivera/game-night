"use client";

import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	forwardRef,
} from "react";
import { cn } from "~/lib/cn";
import type { InferFlattenedErrors } from "~/lib/utils";

type Props = {
	label?: string;
	fieldErrors?: InferFlattenedErrors["fieldErrors"][keyof InferFlattenedErrors["fieldErrors"]];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, fieldErrors, type, name, ...rest },
	ref,
) {
	return (
		<label className="flex flex-col gap-1">
			{!!label && <span className="label-text">{label}</span>}
			<input
				{...rest}
				name={name}
				ref={ref}
				type={type ?? "text"}
				className={cn(
					{
						"input input-bordered": type !== "checkbox" && type !== "file",
					},
					{
						toggle: type === "checkbox",
					},
					{
						"input-error": fieldErrors,
					},
				)}
			/>
			{!!fieldErrors &&
				fieldErrors.map((error) => (
					<div key={error.errorCode} className="text-xs text-red-500">
						{error.message}
					</div>
				))}
		</label>
	);
});
