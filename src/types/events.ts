import type { Events } from "~/server/api/events";

export type EventById = Awaited<ReturnType<typeof Events.findByIdOrThrow>>;
