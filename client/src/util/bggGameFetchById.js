const axios = require("axios").default;
const parser = require("fast-xml-parser");

const bggGameFetchById = async (bggId) => {
  let gameToReturn = null;

  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/thing?id=${bggId}&stats=1`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  const options = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  };

  // Make sure we have parseable data
  if (parser.validate(data) === true && data.items) {
    const {
      items: { item: game },
    } = parser.parse(data, options);

    // Clean up the api data and set our new game object
    gameToReturn = {
      bggId: game.id,
      imageSrc: game.image,
      thumbnailSrc: game.thumbnail,
      description: game.description,
      yearPublished: game.yearpublished.value,
      minPlayers: game.minplayers.value,
      maxPlayers: game.maxplayers.value,
      playingTime: game.playingtime.value,
      minAge: game.minage.value,
      rating: game.statistics.average.value,
      numOfRatings: game.statistics.usersrated.value,
      // Ignore all alternate names, if there are multiple (ie. isArray)
      name: Array.isArray(game.name)
        ? game.name.filter((element) => element.type === "primary")[0].value
        : game.name.value,
      // Get all the deeper nested "link" properties - There's probably a more efficient way to do this
      // without having to parse the link array multiple times
      authors: game.link
        .filter((element) => element.type === "boardgamedesigner")
        .map((designer) => designer.value),
      categories: game.link
        .filter((element) => element.type === "boardgamecategory")
        .map((category) => category.value),
      gameMechanics: game.link
        .filter((element) => element.type === "boardgamemechanic")
        .map((mechanic) => mechanic.value),
    };
  } else {
    gameToReturn = {
      name: "No game with that ID. Please try again.",
    };
  }

  return gameToReturn;
};

module.exports = bggGameFetchById;
