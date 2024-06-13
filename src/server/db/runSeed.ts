import { db } from "~/server/db";
import { seed } from "~/server/db/seed";

seed(db).catch((error) => console.error(error));
