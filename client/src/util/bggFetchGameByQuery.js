// https://api.geekdo.com/xmlapi2/search?query=pandemic&type=boardgame
import { bggFetchGameById } from "./bggFetchGameById";
// Interfaces with the BoardGameGeek API2 and returns a list of names and BGG ids
const axios = require("axios").default;
const parser = require("fast-xml-parser");

export const bggFetchGameByQuery = async (query) => {
  const id = await getGameId(query);
  if (id !== null) {
    const gameToReturn = await bggFetchGameById(id);
    return gameToReturn;
  } else {
    return {
      name: "No game found. Please try again.",
    };
  }
};

const getGameId = async (query) => {
  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame&exact=1`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  const options = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  };

  // Make sure we have parseable data
  if (parser.validate(data) === true) {
    const {
      items: { item: game },
    } = parser.parse(data, options);
    return game ? game.id : null;
  } else {
    return null;
  }
};
