import { Chip, CircularProgress, Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const GameDetailsFull = ({ game }) => {
  return game ? (
    <Fragment>
      <img src={game.imageSrc} alt={game.name} style={{ maxHeight: "20rem" }} />
      <Typography variant="subtitle1">
        Authors:
        {game.authors.map((author) => (
          <Chip key={author} label={author} />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Categories:
        {game.categories.map((category) => (
          <Chip key={category} label={category} />
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
  ) : (
    <CircularProgress size={200} thickness={4} />
  );
};

export default GameDetailsFull;
