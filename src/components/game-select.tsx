"use client";

import { useQuery } from "@tanstack/react-query";
import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { bggQueries } from "~/server/queries/bgg";

export function GameSelect({ initialId }: { initialId?: number }) {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedId, setSelectedId] = useState(initialId);

	const [query, setQuery] = useState("");
	const [debouncedSearchQuery] = useDebounceValue(query, 500);
	const { data: games = [], isFetching } = useQuery(
		bggQueries.gamesByQuery(debouncedSearchQuery),
	);

	return (
		<>
			<Input type="hidden" name="gameBggId" defaultValue={selectedId} />

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
				<PopoverContent className="p-0 w-full" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search games..."
							value={query}
							onValueChange={setQuery}
						/>
						<CommandList>
							{isFetching && <CommandLoading>Searching...</CommandLoading>}
							<CommandEmpty>No results found</CommandEmpty>
							<CommandGroup>
								{games.map((game) => (
									<CommandItem
										key={game.id}
										value={game.id.toString()}
										onSelect={(gameId) => {
											setIsOpen(false);

											if (gameId === selectedId?.toString()) return;

											setSelectedId(Number(gameId));
										}}
										className="flex gap-2"
									>
										<Check
											className={cn(
												"h-4 w-4",
												selectedId === game.id ? "visible" : "invisible",
											)}
										/>
										{game.name}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}

function GameName({ id }: { id: number }) {
	const { data: game } = useQuery(bggQueries.gameById(id));

	if (!game) return null;

	return game.name;
}
