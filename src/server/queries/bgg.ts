import { queryOptions } from "@tanstack/react-query";
import type {
	BggBoardgameItem,
	BggSearchResponse,
	BggThingResponse,
} from "bgg-xml-api-client";

export const bggQueries = {
	gameById: (id: string) =>
		queryOptions({
			queryKey: ["gameById", id],
			queryFn: async () => {
				const response = await fetch(`/api/bgg/games/${id}`);

				if (!response.ok) {
					throw new Error(
						`Error fetching game by ID: ${response.status} ${response.statusText}`,
					);
				}

				const data: BggThingResponse = await response.json();

				return data;
			},
			select: (data) => data.item as BggBoardgameItem,
		}),
	gamesByQuery: (query: string) =>
		queryOptions({
			queryKey: ["gamesByQuery", query],
			queryFn: async () => {
				const response = await fetch(
					`/api/bgg/games?q=${encodeURIComponent(query)}`,
				);

				if (!response.ok) {
					throw new Error(
						`Error fetching games: ${response.status} ${response.statusText}`,
					);
				}

				const data: BggSearchResponse = await response.json();

				return data;
			},
			enabled: query.length > 1,
			select: (data) => (Array.isArray(data.item) ? data.item : [data.item]),
		}),
};
