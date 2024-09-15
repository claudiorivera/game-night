import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { parseGameDescription } from "~/lib/parse-game-description";
import type { GameById } from "~/server/api/bgg";

export function GameDetails({
	game,
}: {
	game: GameById;
}) {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 flex flex-col gap-4 sm:col-span-5">
				<div className="p-4 bg-gradient-to-t from-primary via-secondary to-primary">
					<div className="relative aspect-square w-full">
						<Image
							alt={game.name}
							className="object-contain"
							fill
							sizes="(min-width: 1200px) 33vw, 100vw"
							src={game.image}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-xs">
					<BadgesDisplay badges={game.authors} label="Authors" />
					<BadgesDisplay badges={game.categories} label="Categories" />
					<BadgesDisplay badges={game.mechanics} label="Mechanics" />
					<Description
						definition={`${game.statistics.ratings.average.toFixed(2)} (${game.statistics.ratings.usersrated})`}
						term="Average BGG Rating"
					/>
					<Description
						definition={`${game.minplayers} to ${game.maxplayers}`}
						term="Players"
					/>
					<Description
						definition={`${game.playingtime} minutes`}
						term="Playing Time"
					/>
					<Description definition={`${game.minage}+`} term="Ages" />
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
		<div className="flex items-center gap-2 justify-between">
			<dt>{term}:</dt>
			<dd className="text-nowrap truncate">{definition}</dd>
		</div>
	);
}

function BadgesDisplay({ label, badges }: { label: string; badges: string[] }) {
	return (
		<div className="flex flex-wrap gap-2 items-center">
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
