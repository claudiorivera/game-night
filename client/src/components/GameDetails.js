import React, { Fragment } from "react";
import { Typography, Chip } from "@material-ui/core";

const GameDetails = ({ game }) => {
  return (
    <Fragment>
      <Typography variant="h3">{game.name}</Typography>
      <img src={game.thumbnailSrc} alt={game.name} />
      <Typography variant="subtitle1">
        Designed by:{" "}
        {game.authors &&
          game.authors.map((author, index) => (
            <span key={index}>{author}, </span>
          ))}
      </Typography>
      <Typography variant="subtitle1">
        Average BGG Rating: {game.rating} ({game.numOfRatings} ratings)
      </Typography>
      <Typography variant="subtitle1">
        Published: {game.yearPublished}
      </Typography>
      <Typography variant="subtitle1">
        Players: {game.minPlayers} to {game.maxPlayers}
      </Typography>
      <Typography variant="subtitle1">
        Playing Time: {game.playingTime}
      </Typography>
      <Typography variant="subtitle1">Ages: {game.minAge}+</Typography>
      {game.categories &&
        game.categories.map((category, index) => (
          <Chip key={index} label={category} />
        ))}
      <Typography variant="body1">{game.description}</Typography>
      <hr />
    </Fragment>
  );
};

export default GameDetails;
