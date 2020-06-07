import React, { useEffect, useState, Fragment } from "react";
import { Typography, Chip } from "@material-ui/core";

const axios = require("axios").default;
const parser = require("fast-xml-parser");

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});

  const getGameDetails = async (id) => {
    const { data } = await axios.get(
      `https://api.geekdo.com/xmlapi2/thing?id=${id}`
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
      console.dir(game);

      // Clean up the api data and set our component state
      setGameDetails({
        // Ignore all of the alternate names and only return the value of the
        // first (and only) element which has a type of "primary"
        name: game.name.filter((el) => el.type === "primary")[0].value,
        // Ignore all properties, except for "boardgamedesigner"
        author: game.link.filter((el) => el.type === "boardgamedesigner")[0]
          .value,
        imageSrc: game.image,
        thumbnailSrc: game.thumbnail,
        description: game.description,
        yearPublished: game.yearpublished.value,
        minPlayers: game.minplayers.value,
        maxPlayers: game.maxplayers.value,
        playingTime: game.playingtime.value,
        minage: game.minage.value,
        categories: game.link
          .filter((element) => element.type === "boardgamecategory")
          .map((category) => category.value),
        bggId: game.id,
      });
    }
  };

  // Fetch game details on component render
  useEffect(() => {
    getGameDetails(120677);
  }, []);

  return (
    <Fragment>
      <Typography variant="h1">{gameDetails.name}</Typography>
      <img src={gameDetails.thumbnailSrc} alt={gameDetails.name} />
      <Typography variant="subtitle1">
        Designed by: {gameDetails.author}
      </Typography>
      <Typography variant="subtitle1">
        Published: {gameDetails.yearPublished}
      </Typography>
      <Typography variant="subtitle1">
        Players: {gameDetails.minPlayers} to {gameDetails.maxPlayers}
      </Typography>
      <Typography variant="subtitle1">
        Playing Time: {gameDetails.playingTime}
      </Typography>
      <Typography variant="subtitle1">Ages: {gameDetails.minAge}+</Typography>
      {gameDetails.categories &&
        gameDetails.categories.map((category, index) => (
          <Chip key={index} label={category} />
        ))}
      <Typography variant="body1">{gameDetails.description}</Typography>
    </Fragment>
  );
};

export default GameDetails;
