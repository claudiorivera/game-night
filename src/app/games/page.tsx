import Link from "next/link";
import { getAll } from "~/app/games/api";
import { GameInfo } from "~/components/game-info";
import { Button } from "~/components/ui/button";

export default async function GamesListPage() {
	const games = await getAll();

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
