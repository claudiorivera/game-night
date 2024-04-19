import { z } from "zod";
import { gamesByQuery } from "~/app/games/bgg";
import { GameQueryResult } from "~/app/games/import/game-query-result";
import { SearchGamesForm } from "~/app/games/import/search-games-form";

export default async function ImportGamesPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const validation = z.string().safeParse(searchParams.query);
	const query = validation.success ? validation.data : "";

	const results = query.length ? await gamesByQuery(query) : [];

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
