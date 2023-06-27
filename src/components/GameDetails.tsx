import Image from "next/image";

import { type BGGGameResponse } from "~/server/api/routers/bgg";

type Props = {
	game: BGGGameResponse;
};

export const GameDetails = ({ game }: Props) => {
	if (!game) return null;

	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
				<div className="relative aspect-square">
					<Image
						src={game.imageSrc}
						alt={game.name}
						fill
						className="object-contain"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<BadgesDisplay label="Authors" badges={game.authors} />
					<BadgesDisplay label="Categories" badges={game.categories} />
					<Description
						term="Average BGG Rating"
						definition={`${game.rating.toFixed(2)} (${
							game.numOfRatings
						} ratings)`}
					/>
					<Description
						term="Players"
						definition={`${game.minPlayers} to ${game.maxPlayers}`}
					/>
					<Description
						term="Playing Time"
						definition={`${game.playingTime} minutes`}
					/>
					<Description term="Ages" definition={`${game.minAge}+`} />
				</div>
			</div>
			<div className="col-span-12 sm:col-span-8">
				<p>{game.description}</p>
			</div>
		</div>
	);
};

type DescriptionProps = {
	term: string;
	definition: string;
};

const Description = ({ term, definition }: DescriptionProps) => (
	<div className="flex items-center gap-2">
		<dt>{term}:</dt>
		<dd>{definition}</dd>
	</div>
);

type BadgesDisplayProps = {
	label: string;
	badges: string[];
};

const BadgesDisplay = ({ label, badges }: BadgesDisplayProps) => (
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
