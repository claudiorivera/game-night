"use server";

import { formatError } from "~/lib/utils";
import { importGameFormSchema } from "~/schemas/games";
import { db } from "~/server/db";
import { gamesTable } from "~/server/db/schema";
import type { InferFlattenedErrors, Maybe } from "~/types";

export type ImportGameFormState = Maybe<{
	errors?: InferFlattenedErrors<typeof importGameFormSchema>;
	message?: string;
}>;

export async function importGame(
	_formState: ImportGameFormState,
	formData: FormData,
) {
	const validation = importGameFormSchema.safeParse({
		name: formData.get("name"),
		imageSrc: formData.get("imageSrc"),
		thumbnailSrc: formData.get("thumbnailSrc"),
		description: formData.get("description"),
		authors: formData.getAll("authors"),
		categories: formData.getAll("categories"),
		mechanics: formData.getAll("mechanics"),
		bggId: formData.get("bggId"),
		yearPublished: formData.get("yearPublished"),
		minPlayers: formData.get("minPlayers"),
		maxPlayers: formData.get("maxPlayers"),
		playingTime: formData.get("playingTime"),
		minAge: formData.get("minAge"),
		rating: formData.get("rating"),
		numOfRatings: formData.get("numOfRatings"),
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.error(errors);

		return { errors } satisfies ImportGameFormState;
	}

	const [newGame] = await db
		.insert(gamesTable)
		.values(validation.data)
		.returning();

	if (newGame) {
		return {
			message: "You have successfully imported a game!",
		} satisfies ImportGameFormState;
	}
}
