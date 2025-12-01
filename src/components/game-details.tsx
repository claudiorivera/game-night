import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { parseGameDescription } from "@/lib/parse-game-description";
import type { GameById } from "@/server/api/bgg";

export function GameDetails({ game }: { game: GameById }) {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 flex flex-col gap-4 sm:col-span-5">
				<div className="bg-linear-to-t from-primary via-secondary to-primary p-4">
					{game.image && (
						<div className="relative aspect-square w-full">
							<Image
								alt={game.names.at(0)?.value ?? "game image"}
								className="object-contain"
								fill
								sizes="(min-width: 1200px) 33vw, 100vw"
								src={game.image}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-2 text-xs">
					<BadgesDisplay badges={game.authors} label="Authors" />
					<BadgesDisplay badges={game.categories} label="Categories" />
					<BadgesDisplay badges={game.mechanics} label="Mechanics" />
					<Description
						definition={`${game.statistics?.ratings.average} (${game.statistics?.ratings.usersRated})`}
						term="Average BGG Rating"
					/>
					<Description
						definition={`${game.minPlayers} to ${game.maxPlayers}`}
						term="Players"
					/>
					<Description
						definition={`${game.playingTime} minutes`}
						term="Playing Time"
					/>
					<Description definition={`${game.minAge}+`} term="Ages" />
				</div>
			</div>
			<div className="col-span-12 sm:col-span-7">
				<p>{parseGameDescription(game.description)}</p>
			</div>
		</div>
	);
}

function Description({
	term,
	definition,
}: {
	term: string;
	definition: string;
}) {
	return (
		<div className="flex items-center justify-between gap-2">
			<dt>{term}:</dt>
			<dd className="truncate text-nowrap">{definition}</dd>
		</div>
	);
}

function BadgesDisplay({
	label,
	badges,
}: {
	label: string;
	badges: Array<string>;
}) {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<span>{label}: </span>
			<div className="flex flex-wrap gap-1">
				{badges.map((badge) => (
					<Badge key={badge} variant="outline">
						{badge}
					</Badge>
				))}
			</div>
		</div>
	);
}
