import React, { useEffect, useState, Fragment, useContext } from "react";
import { GlobalContext } from "../context";
import { Typography, Chip, Button } from "@material-ui/core";

const axios = require("axios").default;
const parser = require("fast-xml-parser");

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});
  const { addGame } = useContext(GlobalContext);

  const getGameDetails = async (id) => {
    const { data } = await axios.get(
      `https://api.geekdo.com/xmlapi2/thing?id=${id}&stats=1`
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
      setGameDetails({
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
        name: game.name.filter((element) => element.type === "primary")[0]
          .value,
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
      });
    }
  };

  const handleAddGame = async () => {
    addGame({ ...gameDetails });
  };

  // Fetch game details on component render
  useEffect(() => {
    // https://api.geekdo.com/xmlapi2/search?query=terraforming+mars&type=boardgame - example query to find bgg id
    getGameDetails(167791);
  }, []);

  return (
    <Fragment>
      <Typography variant="h1">{gameDetails.name}</Typography>
      <img src={gameDetails.thumbnailSrc} alt={gameDetails.name} />
      <Typography variant="subtitle1">
        Designed by:{" "}
        {gameDetails.authors &&
          gameDetails.authors.map((author, index) => (
            <span key={index}>{author}, </span>
          ))}
      </Typography>
      <Typography variant="subtitle1">
        Average BGG Rating: {gameDetails.rating} (from{" "}
        {gameDetails.numOfRatings} users)
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
      <Button variant="contained" color="primary" onClick={handleAddGame}>
        Add Game
      </Button>
    </Fragment>
  );
};

export default GameDetails;
