import React, { useEffect, useState, Fragment } from "react";
import { Typography } from "@material-ui/core";

const axios = require("axios").default;
const parser = require("fast-xml-parser");

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});

  const getGameDetails = async () => {
    const { data } = await axios.get(
      "https://api.geekdo.com/xmlapi2/thing?id=13"
    );

    // https://github.com/NaturalIntelligence/fast-xml-parser
    const options = {
      attributeNamePrefix: "",
      ignoreAttributes: false,
    };

    if (parser.validate(data) === true) {
      const {
        items: { item: game },
      } = parser.parse(data, options);
      setGameDetails({
        ...game,
        // Ignore all of the alternate names and only return the value of the
        // first element, which has a type of "primary"
        name: game.name.filter((el) => el.type === "primary")[0].value,
        description: game.description,
      });
    } else {
      setGameDetails({ name: "No game found" });
    }
  };

  useEffect(() => {
    getGameDetails();
  }, []);

  return (
    <Fragment>
      <Typography variant="body1">{gameDetails.name}</Typography>
      <img src={gameDetails.thumbnail} alt={gameDetails.name} />
      <Typography variant="body2">{gameDetails.description}</Typography>
    </Fragment>
  );
};

export default GameDetails;
