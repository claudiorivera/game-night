import { Box, Chip, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { IGame } from "types";

const StyledChip = styled(Chip)({
  padding: "0",
  margin: ".1rem",
});

interface Props {
  game: IGame;
}

export const GameMetaData = ({ game }: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1">
        Authors:
        {game.authors.map((author) => (
          <StyledChip key={author} label={author} />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Categories:
        {game.categories.map((category) => (
          <StyledChip key={category} label={category} />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Average BGG Rating: {game.rating.toFixed(2)} ({game.numOfRatings}{" "}
        ratings)
      </Typography>
      <Typography variant="subtitle1">
        Players: {game.minPlayers} to {game.maxPlayers}
      </Typography>
      <Typography variant="subtitle1">
        Playing Time: {game.playingTime} minutes
      </Typography>
      <Typography variant="subtitle1">Ages: {game.minAge}+</Typography>
    </Box>
  );
};
