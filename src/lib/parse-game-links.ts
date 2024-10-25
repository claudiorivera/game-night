type PayloadThingLinks = {
	type: string;
	id: string;
	value: string;
};

export function parseGameLinks(links: Array<PayloadThingLinks>) {
	const linksData = new Map<"authors" | "categories" | "mechanics", string[]>([
		["authors", []],
		["categories", []],
		["mechanics", []],
	]);

	for (const link of links) {
		if (link.type === "boardgamedesigner") {
			linksData.get("authors")?.push(link.value);
		}
		if (link.type === "boardgamecategory") {
			linksData.get("categories")?.push(link.value);
		}
		if (link.type === "boardgamemechanic") {
			linksData.get("mechanics")?.push(link.value);
		}
	}

	return Object.fromEntries(linksData) as {
		authors: string[];
		categories: string[];
		mechanics: string[];
	};
}
