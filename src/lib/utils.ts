import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export function getRandomElement<T>(array: Array<T>) {
	if (array.length === 0) {
		return;
	}

	const randomIndex = Math.floor(Math.random() * array.length);

	return array[randomIndex];
}

export function validate<T extends z.ZodTypeAny>({
	formData,
	schema,
}: {
	formData: FormData;
	schema: T;
}) {
	const _formData = Object.fromEntries(formData);

	return schema.safeParse(_formData) as ReturnType<T["safeParse"]>;
}
