import type { BggBoardgameItem } from "bgg-xml-api-client";
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

export function getAverageRatingForGame(game: BggBoardgameItem) {
	if (typeof game.statistics?.ratings.average.value !== "number") {
		return "N/A";
	}

	return `${game.statistics?.ratings.average.value.toFixed(2)} (${game.statistics?.ratings.usersrated.value.toLocaleString()})`;
}
