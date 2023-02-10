import { Box, Chip, Typography } from "@mui/material";
import { BGGGameResponse } from "lib/fetchBggGameById";

type GameMetaDataProps = {
  game: BGGGameResponse;
};
export const GameMetaData = ({ game }: GameMetaDataProps) => {
  if (!game) return null;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1">
        Authors:
        {game.authors.map((author) => (
          <Chip
            sx={{
              m: 0.5,
            }}
            key={author}
            label={author}
          />
        ))}
      </Typography>
      <Typography variant="subtitle1">
        Categories:
        {game.categories.map((category) => (
          <Chip
            sx={{
              m: 0.5,
            }}
            key={category}
            label={category}
          />
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
