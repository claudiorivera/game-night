"use client";

import { type ComponentProps, forwardRef } from "react";
import { Label } from "~/components/ui/label";
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as _Select,
} from "~/components/ui/select";
import type { InferFlattenedErrors } from "~/lib/utils";

type Option = {
	value: string;
	label: string;
};

type Props = {
	label?: string;
	options: Array<Option>;
	fieldErrors?: InferFlattenedErrors["fieldErrors"][keyof InferFlattenedErrors["fieldErrors"]];
} & ComponentProps<typeof _Select>;

export function Select({ label, options, fieldErrors, ...rest }: Props) {
	return (
		<div className="flex flex-col gap-1">
			{!!label && <Label>{label}</Label>}
			<_Select {...rest}>
				<SelectTrigger>
					<SelectValue placeholder="Select Game" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</_Select>

			{!!fieldErrors &&
				fieldErrors.map((error) => (
					<div key={error.errorCode} className="text-xs text-red-500">
						{error.message}
					</div>
				))}
		</div>
	);
}
