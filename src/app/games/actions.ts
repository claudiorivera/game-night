"use server";

import { revalidatePath } from "next/cache";
import { importGameFormSchema } from "~/app/games/schemas";
import { db } from "~/lib/db";
import {
	type InferFlattenedErrors,
	type PossiblyUndefined,
	formatError,
} from "~/lib/utils";

export type ImportGameFormState = PossiblyUndefined<{
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

	const game = await db.game.create({
		data: validation.data,
		select: {
			id: true,
		},
	});

	if (game) {
		return {
			message: "You have successfully imported a game!",
		} satisfies ImportGameFormState;
	}
}
