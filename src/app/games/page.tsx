import Link from "next/link";
import { getAll } from "~/app/games/api";
import { GameInfo } from "~/components/game-info";

export default async function GamesListPage() {
	const games = await getAll();

	return (
		<div className="flex flex-col gap-4">
			<Link href="/games/import" className="btn btn-secondary">
				Add Game
			</Link>

			<div>
				{games.map((game) => (
					<GameInfo key={game.id} game={game} />
				))}
			</div>
		</div>
	);
}
