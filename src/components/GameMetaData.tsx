import { BGGGameResponse } from "~/lib/fetchBggGameById";

type GameMetaDataProps = {
	game: BGGGameResponse;
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
				<div className="badge-neutral badge" key={badge}>
					{badge}
				</div>
			))}
		</div>
	</div>
);

export const GameMetaData = ({ game }: GameMetaDataProps) => {
	if (!game) return null;

	return (
		<div className="flex flex-col gap-2">
			<BadgesDisplay label="Authors" badges={game.authors} />
			<BadgesDisplay label="Categories" badges={game.categories} />
			<Description
				term="Average BGG Rating"
				definition={`${game.rating.toFixed(2)} (${game.numOfRatings} ratings)`}
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
	);
};
