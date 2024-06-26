import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ZodError, ZodIssue, z } from "zod";

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

export function validate<T extends z.ZodTypeAny>({
	formData,
	schema,
}: { formData: FormData; schema: T }) {
	const _formData = Object.fromEntries(formData);

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
