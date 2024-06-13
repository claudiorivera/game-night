import type { Bgg } from "~/server/api/bgg";

export type GamesByQuery = Awaited<ReturnType<typeof Bgg.gamesByQuery>>;
