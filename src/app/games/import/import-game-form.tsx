"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { type ImportGameFormState, importGame } from "~/app/games/actions";
import type { GamesByQuery } from "~/app/games/bgg";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";

export function ImportGameForm({ game }: { game: GamesByQuery[number] }) {
	const [state, formAction] = useFormState<ImportGameFormState, FormData>(
		importGame,
		undefined,
	);

	useEffect(() => {
		if (state?.message) {
			toast.success(state.message);
			redirect("/games");
		}
	}, [state]);

	return (
		<form id="import-game" action={formAction}>
			<Input type="hidden" name="bggId" value={game.bggId} />
			<Input type="hidden" name="name" value={game.name} />
			<Input type="hidden" name="imageSrc" value={game.imageSrc} />
			<Input type="hidden" name="thumbnailSrc" value={game.thumbnailSrc} />
			<Input type="hidden" name="description" value={game.description} />
			{game.authors.map((author) => (
				<Input key={author} type="hidden" name="authors" value={author} />
			))}
			{game.categories.map((category) => (
				<Input
					key={category}
					type="hidden"
					name="categories"
					value={category}
				/>
			))}
			{game.mechanics.map((mechanic) => (
				<Input key={mechanic} type="hidden" name="mechanics" value={mechanic} />
			))}
			<Input type="hidden" name="yearPublished" value={game.yearPublished} />
			<Input type="hidden" name="minPlayers" value={game.minPlayers} />
			<Input type="hidden" name="maxPlayers" value={game.maxPlayers} />
			<Input type="hidden" name="playingTime" value={game.playingTime} />
			<Input type="hidden" name="minAge" value={game.minAge} />
			<Input type="hidden" name="rating" value={game.rating} />
			<Input type="hidden" name="numOfRatings" value={game.numOfRatings} />

			<div className="flex flex-col gap-4">
				<SubmitButton>Add This Game</SubmitButton>
			</div>
		</form>
	);
}
