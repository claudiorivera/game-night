import type { Games } from "~/server/api/games";

type AllGames = Awaited<ReturnType<typeof Games.getAll>>;

export type Game = AllGames[number];
