import Image from "next/image";
import { SkeletonRow } from "~/components/SkeletonRow";
import { type BGGGameResponse } from "~/server/api/routers/bgg";

export function GameDetails({ game }: { game?: BGGGameResponse }) {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
				<div className="relative aspect-square">
					{game?.imageSrc ? (
						<Image
							alt={game.name}
							className="object-contain"
							fill
							src={game.imageSrc}
						/>
					) : (
						<div className="h-full w-full bg-slate-300 object-cover" />
					)}
				</div>
				<div className="flex flex-col gap-2">
					{!game ? (
						<SkeletonRows />
					) : (
						<>
							<BadgesDisplay badges={game.authors} label="Authors" />
							<BadgesDisplay badges={game.categories} label="Categories" />
							<Description
								definition={`${game.rating.toFixed(2)} (${
									game.numOfRatings
								} ratings)`}
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
						</>
					)}
				</div>
			</div>
			<div className="col-span-12 sm:col-span-8">
				{game?.description ? <p>{game.description}</p> : <SkeletonRows />}
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
		<div className="flex items-center gap-2">
			<dt>{term}:</dt>
			<dd>{definition}</dd>
		</div>
	);
}

function BadgesDisplay({ label, badges }: { label: string; badges: string[] }) {
	return (
		<div className="flex flex-wrap gap-2">
			<span>{label}: </span>
			<div className="flex flex-wrap gap-1">
				{badges.map((badge) => (
					<div className="badge badge-neutral" key={badge}>
						{badge}
					</div>
				))}
			</div>
		</div>
	);
}

function SkeletonRows() {
	return (
		<div className="flex flex-col gap-1">
			{[...Array<unknown>(4)].map((_, i) => (
				<SkeletonRow key={i} />
			))}
		</div>
	);
}
