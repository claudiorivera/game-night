import { z } from "zod";
import { GameQueryResult } from "~/app/games/import/game-query-result";
import { SearchGamesForm } from "~/app/games/import/search-games-form";
import { Bgg } from "~/server/api/bgg";

export default async function ImportGamesPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const validation = z.string().safeParse(searchParams.query);
	const query = validation.success ? validation.data : "";

	const results = query.length ? await Bgg.gamesByQuery(query) : [];

	return (
		<div className="flex flex-col gap-4">
			<SearchGamesForm query={query} />

			{!!results.length && (
				<div>
					{results.map((result) => (
						<GameQueryResult key={result.bggId} game={result} />
					))}
				</div>
			)}

			{!results.length && !!query.length && (
				<div>
					No results found for <span>{query}</span>
				</div>
			)}
		</div>
	);
}
