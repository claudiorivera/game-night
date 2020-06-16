import React from "react";
import { Typography, Chip, Container } from "@material-ui/core";

const GameDetails = ({ game }) => {
  return (
    <Container>
      <img src={game.thumbnailSrc} alt={game.name} />
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
    </Container>
  );
};

export default GameDetails;
