import { db } from "~/db";
import { seed } from "~/db/seed";

seed(db).catch((error) => console.error(error));
