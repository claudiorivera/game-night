const axios = require("axios").default;
const parser = require("fast-xml-parser");

const bggGameFetchById = async (bggId) => {
  let gameToReturn = null;

  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/thing?id=${bggId}&stats=1`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  const options = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  };

  if (parser.validate(data) === true) {
    const {
      items: { item: game },
    } = parser.parse(data, options);

    // Clean up the api data and set our component state
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
      // Ignore all of the alternate names and only return the value of the
      // first (and only) element which has a type of "primary"
      name: game.name.filter((element) => element.type === "primary")[0].value,
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
  }

  return gameToReturn;
};

module.exports = bggGameFetchById;
