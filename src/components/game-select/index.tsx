"use client";

import { useQuery } from "@tanstack/react-query";
import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import bggLogo from "@/components/game-select/bgg-logo.png";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { getNameForGame } from "@/lib/bgg";
import { cn } from "@/lib/utils";
import { bggQueries } from "@/server/queries/bgg";

export function GameSelect({
	initialId,
	errors,
}: {
	initialId?: string;
	errors: Array<string> | undefined;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedId, setSelectedId] = useState(initialId);

	const [query, setQuery] = useState("");
	const [debouncedSearchQuery] = useDebounceValue(query, 500);
	const { data: games = [], isFetching } = useQuery(
		bggQueries.gamesByQuery(debouncedSearchQuery),
	);

	return (
		<div className="flex flex-col gap-1">
			<input type="hidden" name="gameBggId" defaultValue={selectedId} />

			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={isOpen}
						className="justify-between"
					>
						{selectedId ? <GameName id={selectedId} /> : "Select a game..."}
						<ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-full p-0" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search games..."
							value={query}
							onValueChange={setQuery}
						/>
						<CommandList>
							{isFetching && <CommandLoading>Searching...</CommandLoading>}
							<CommandEmpty>No results found</CommandEmpty>
							{games.map((game) => (
								<CommandItem
									key={game.id}
									value={game.id.toString()}
									onSelect={(gameId) => {
										setIsOpen(false);

										if (gameId === selectedId?.toString()) return;

										setSelectedId(gameId);
									}}
									className="flex gap-2"
								>
									<Check
										className={cn(
											"size-4",
											selectedId === game.id.toString()
												? "visible"
												: "invisible",
										)}
									/>
									{game.name.value}
								</CommandItem>
							))}
						</CommandList>
					</Command>
					<Button
						asChild
						variant="ghost"
						className="h-full w-full rounded-none"
						title="Visit BoardGameGeek.com"
					>
						<a
							href="https://boardgamegeek.com"
							target="_blank"
							rel="noreferrer"
						>
							<Image
								src={bggLogo}
								alt="powered by boardgamegeek logo"
								className="m-auto w-32"
							/>
						</a>
					</Button>
				</PopoverContent>
			</Popover>

			{!!errors &&
				errors.map((error) => (
					<div key={error} className="text-red-500 text-xs">
						{error}
					</div>
				))}
		</div>
	);
}

function GameName({ id }: { id: string }) {
	const { data: game } = useQuery(bggQueries.gameById(id));

	if (!game) return null;

	return getNameForGame(game);
}
