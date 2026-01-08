import type { BggBoardgameItem, BggThingLinkType } from "bgg-xml-api-client";

export function getNameForGame({ name }: BggBoardgameItem): string {
	if (Array.isArray(name)) {
		const primaryName = name.find((name) => name.type === "primary");

		return primaryName
			? primaryName.value
			: (name.at(0)?.value ?? "Unknown game");
	}

	return name.value;
}

function extractLinkValuesByType({
	link,
	linkType,
}: {
	link: BggBoardgameItem["link"];
	linkType: BggThingLinkType;
}) {
	const links = Array.isArray(link) ? link : [link];

	return links.filter((l) => l.type === linkType).map((l) => l.value);
}

export function getAuthorsForGame({ link }: BggBoardgameItem) {
	return extractLinkValuesByType({ link, linkType: "boardgamedesigner" });
}

export function getCategoriesForGame({ link }: BggBoardgameItem) {
	return extractLinkValuesByType({ link, linkType: "boardgamecategory" });
}

export function getMechanicsForGame({ link }: BggBoardgameItem) {
	return extractLinkValuesByType({ link, linkType: "boardgamemechanic" });
}
