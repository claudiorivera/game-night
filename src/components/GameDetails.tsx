import Image from "next/image";

import { type BGGGameResponse } from "~/server/api/routers/bgg";

type Props = {
	game?: BGGGameResponse;
};

export const GameDetails = ({ game }: Props) => (
	<div className="grid grid-cols-12 gap-4">
		<div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
			<div className="relative aspect-square">
				{game?.imageSrc ? (
					<Image
						src={game.imageSrc}
						alt={game.name}
						fill
						className="object-contain"
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
					</>
				)}
			</div>
		</div>
		<div className="col-span-12 sm:col-span-8">
			{game?.description ? <p>{game.description}</p> : <SkeletonRows />}
		</div>
	</div>
);

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

const SkeletonRows = () => (
	<div className="flex flex-col gap-1">
		{Array(4)
			.fill(null)
			.map((_, i) => (
				<SkeletonRow key={i} />
			))}
	</div>
);

const SkeletonRow = () => (
	<div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
);
