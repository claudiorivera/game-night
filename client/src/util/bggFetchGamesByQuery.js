// https://api.geekdo.com/xmlapi2/search?query=pandemic&type=boardgame
import { bggFetchGameById } from "./bggFetchGameById";

// Interfaces with the BoardGameGeek API2 and returns a list of names and BGG ids
const axios = require("axios").default;
const parser = require("fast-xml-parser");

export const bggFetchGamesByQuery = async (query) => {
  let gamesToReturn = [];
  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame`
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
      items: { item: games },
    } = parser.parse(data, options);
    gamesToReturn = games.map(async (game) => {
      const result = await bggFetchGameById(game.id);
      console.log(result);

      return result;
    });
  } else {
    gamesToReturn = [
      {
        bggId: 0,
      },
    ];
  }
  return gamesToReturn;
};
