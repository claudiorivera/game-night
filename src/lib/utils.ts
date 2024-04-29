import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ZodError, ZodIssue, ZodTypeAny, z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomElement<T>(array: T[]) {
	if (array.length === 0) {
		return;
	}

	const randomIndex = Math.floor(Math.random() * array.length);

	return array[randomIndex];
}

export type InferFlattenedErrors<SchemaType extends z.ZodTypeAny = ZodTypeAny> =
	z.inferFlattenedErrors<SchemaType, { message: string; errorCode: string }>;

export type PossiblyUndefined<T> = T | undefined;

export function validate<T extends z.ZodTypeAny>({
	formData,
	schema,
}: { formData: FormData; schema: T }) {
	const _formData = Object.fromEntries(formData);
	console.log({ _formData });

	return schema.safeParse(_formData) as ReturnType<T["safeParse"]>;
}

export function formatError({
	error,
}: {
	error: ZodError;
}) {
	return error.flatten((issue: ZodIssue) => ({
		message: issue.message,
		errorCode: issue.code,
	}));
}
