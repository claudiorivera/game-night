import React, { Fragment } from "react";
import { Typography, Chip } from "@material-ui/core";

const GameDetails = ({ game }) => {
  return (
    <Fragment>
      <img src={game.imageSrc} alt={game.name} style={{ maxHeight: "20rem" }} />
      <Typography variant="subtitle1">
        Authors:
        {game.authors.map((author, index) => (
          <Chip key={index} label={author} />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Categories:
        {game.categories.map((category, index) => (
          <Chip key={index} label={category} />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Average BGG Rating: {game.rating} ({game.numOfRatings} ratings)
      </Typography>
      <Typography variant="subtitle1">
        Players: {game.minPlayers} to {game.maxPlayers}
      </Typography>
      <Typography variant="subtitle1">
        Playing Time: {game.playingTime} minutes
      </Typography>
      <Typography variant="subtitle1">Ages: {game.minAge}+</Typography>
      <Typography variant="body1">{game.description}</Typography>
    </Fragment>
  );
};

export default GameDetails;
