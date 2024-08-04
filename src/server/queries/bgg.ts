import { queryOptions } from "@tanstack/react-query";
import { Bgg } from "~/server/api/bgg";

export const bggQueries = {
	gameById: (id?: number) =>
		queryOptions({
			queryKey: ["gameById", id],
			queryFn: () => (id ? Bgg.gameById(id) : null),
			enabled: !!id,
		}),
	gamesByQuery: (query: string) =>
		queryOptions({
			queryKey: ["gamesByQuery", query],
			queryFn: () => Bgg.gamesByQuery(query),
			enabled: query.length > 0,
		}),
};
