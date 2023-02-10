import { Box, Grid, Typography } from "@mui/material";
import { Game } from "@prisma/client";
import { GameMetaData } from "components";
import { BGGGameResponse } from "lib/bggFetchGameById";
import Image from "next/image";

import placeholderImage from "../public/game-night-logo.png";

interface Props {
  game: Game | BGGGameResponse;
}
export const GameDetails = ({ game }: Props) => (
  <Grid container spacing={4}>
    <Grid item md={5} sm={4} xs={12}>
      <Box
        sx={{ position: "relative", width: "100%", aspectRatio: "1/1", mb: 2 }}
      >
        <Image src={game.imageSrc ?? placeholderImage} alt={game.name} fill />
      </Box>
      <GameMetaData game={game} />
    </Grid>
    <Grid item md={7} sm={8} xs={12}>
      <Typography variant="body1">{game.description}</Typography>
    </Grid>
  </Grid>
);
