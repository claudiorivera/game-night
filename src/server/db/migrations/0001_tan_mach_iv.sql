DROP TABLE "game" CASCADE;--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "gameBggId" integer NOT NULL default 13;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "gameId";