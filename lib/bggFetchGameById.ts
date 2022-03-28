// Interfaces with the BoardGameGeek API2 and returns a custom game object
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { BGGGameResponse, BGGQueryResponse } from "types";

export const bggFetchGameById = async (id: number) => {
  const { data } = await axios.get<string>(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/thing?id=${id}&stats=1`
  );

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const parsedData = parser.parse(data);

  const game = parsedData.items.item;

  // Clean up the api data and set our new game object
  const gameObject: BGGGameResponse = {
    bggId: +game.id,
    imageSrc: game.image,
    thumbnailSrc: game.thumbnail,
    description: game.description,
    yearPublished: +game.yearpublished.value,
    minPlayers: +game.minplayers.value,
    maxPlayers: +game.maxplayers.value,
    playingTime: +game.playingtime.value,
    minAge: +game.minage.value,
    rating: +game.statistics.ratings.average.value,
    numOfRatings: +game.statistics.ratings.usersrated.value,
    // Ignore all alternate names, if there are multiple (ie. isArray)
    name: Array.isArray(game.name)
      ? game.name.filter(
          (nameResponse: BGGQueryResponse) => nameResponse.type === "primary"
        )[0].value
      : game.name.value,
    // Get all the deeper nested "link" properties - There's probably a more efficient way to do this
    // without having to parse the link array multiple times
    authors: game.link
      .filter((element: BGGQueryResponse) => {
        return element.type === "boardgamedesigner";
      })
      .map((designer: BGGQueryResponse) => designer.value),
    categories: game.link
      .filter(
        (element: BGGQueryResponse) => element.type === "boardgamecategory"
      )
      .map((category: BGGQueryResponse) => category.value),
    mechanics: game.link
      .filter(
        (element: BGGQueryResponse) => element.type === "boardgamemechanic"
      )
      .map((mechanic: BGGQueryResponse) => mechanic.value),
  };
  return gameObject;
};
