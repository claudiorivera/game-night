import { client } from "~/server/db";
import { seed } from "~/server/db/seed";

seed()
	.catch((error) => console.error(error))
	.finally(() => client.end());
