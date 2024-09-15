import { queryOptions } from "@tanstack/react-query";
import { Bgg } from "~/server/api/bgg";

export const bggQueries = {
	gameById: (id: number) =>
		queryOptions({
			queryKey: ["gameById", id],
			queryFn: () => Bgg.gameById(id),
		}),
	gamesByQuery: (query: string) =>
		queryOptions({
			queryKey: ["gamesByQuery", query],
			queryFn: () => Bgg.gamesByQuery(query),
			enabled: query.length > 0,
			select: (data) => data.flatMap((data) => data.items),
		}),
};
