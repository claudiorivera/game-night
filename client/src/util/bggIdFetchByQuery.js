// https://api.geekdo.com/xmlapi2/search?query=pandemic&type=boardgame

// Interfaces with the BoardGameGeek API2 and returns a list of names and BGG ids

const axios = require("axios").default;
const parser = require("fast-xml-parser");

const bggIdFetchByQuery = async (query) => {
  let gamesList = [];

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

    // Clean up the api data and set our new game object
    if (games && games.length > 0) {
      games.forEach((game) => {
        gamesList.push({
          bggId: game.id,
          // Ignore all alternate names, if there are multiple (ie. isArray)
          name: Array.isArray(game.name)
            ? game.name.filter((element) => element.type === "primary")[0].value
            : game.name.value,
        });
      });
    }
    // Sort by BGG ID ascending, since the lower IDs tend to be the best result
    gamesList.sort((a, b) => a.bggId - b.bggId);
  } else {
    gamesList = [
      {
        name: "No game with that ID. Please try a different ID.",
      },
    ];
  }

  return gamesList;
};

module.exports = bggIdFetchByQuery;
