"use client";

import type { GetAll } from "~/app/games/api";
import { GameDetails } from "~/components/game-details";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

export function GameInfo({ game }: { game: GetAll[number] }) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value={game.name}>
				<AccordionTrigger>
					{game.name} ({game.yearPublished})
				</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4">
					<GameDetails game={game} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
