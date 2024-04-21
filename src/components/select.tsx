"use client";

import {
	type DetailedHTMLProps,
	type SelectHTMLAttributes,
	forwardRef,
} from "react";
import { cn } from "~/lib/utils";
import type { InferFlattenedErrors } from "~/lib/utils";

type Option = {
	value: string;
	label: string;
};

type Props = {
	label: string;
	options: Array<Option>;
	fieldErrors?: InferFlattenedErrors["fieldErrors"][keyof InferFlattenedErrors["fieldErrors"]];
} & DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
	{ label, options, fieldErrors, ...rest },
	ref,
) {
	return (
		<label className="flex flex-col gap-1">
			<span className="label-text">{label}</span>
			<select
				{...rest}
				ref={ref}
				className={cn("select select-bordered", {
					"input-error": !!fieldErrors,
				})}
			>
				<option value={-1} disabled>
					{`Select ${label}`}
				</option>
				{options.map(({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
			{!!fieldErrors &&
				fieldErrors.map((error) => (
					<div key={error.errorCode} className="text-xs text-red-500">
						{error.message}
					</div>
				))}
		</label>
	);
});
