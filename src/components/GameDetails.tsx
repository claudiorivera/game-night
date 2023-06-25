import Image from "next/image";

import { GameMetaData } from "~/components";
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
				<GameMetaData game={game} />
			</div>
			<div className="col-span-12 sm:col-span-8">
				<p>{game.description}</p>
			</div>
		</div>
	);
};
