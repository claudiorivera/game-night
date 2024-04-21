"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import type { GamesByQuery } from "~/app/games/bgg";
import { ImportGameForm } from "~/app/games/import/import-game-form";
import { GameDetails } from "~/components/game-details";
import { cn } from "~/lib/utils";

export function GameQueryResult({ game }: { game: GamesByQuery[number] }) {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between border-b p-4 text-left font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
						<p>
							{game.name} ({game.yearPublished})
						</p>
						<ChevronUpIcon
							className={cn("h-5 w-5", {
								"rotate-180 transform": open,
							})}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="py-4 text-sm text-gray-500 flex flex-col gap-4">
						<ImportGameForm game={game} />

						<GameDetails game={game} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
