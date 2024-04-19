"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import type { GetAll } from "~/app/games/api";
import { GameDetails } from "~/components/game-details";
import { cn } from "~/lib/cn";

export function GameInfo({ game }: { game: GetAll[number] }) {
	return (
		<Disclosure key={game.id}>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between border-b p-4 text-left font-medium hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
						<h6>
							{game.name} ({game.yearPublished})
						</h6>
						<ChevronUpIcon
							className={cn("h-5 w-5", {
								"rotate-180 transform": open,
							})}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="p-4 text-sm text-gray-500">
						<GameDetails game={game} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
