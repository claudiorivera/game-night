"use client";

import type { GamesByQuery } from "~/app/games/bgg";
import { ImportGameForm } from "~/app/games/import/import-game-form";
import { GameDetails } from "~/components/game-details";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

export function GameQueryResult({ game }: { game: GamesByQuery[number] }) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value={game.name}>
				<AccordionTrigger>
					{game.name} ({game.yearPublished})
				</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4">
					<ImportGameForm game={game} />

					<GameDetails game={game} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
