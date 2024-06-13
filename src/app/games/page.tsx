import Link from "next/link";
import { GameInfo } from "~/components/game-info";
import { Button } from "~/components/ui/button";
import { Games } from "~/server/api/games";

export default async function GamesListPage() {
	const games = await Games.getAll();

	return (
		<div className="flex flex-col gap-4">
			<Button asChild variant="secondary">
				<Link href="/games/import">Add Game</Link>
			</Button>

			<div>
				{games.map((game) => (
					<GameInfo key={game.id} game={game} />
				))}
			</div>
		</div>
	);
}
