import { Box, Grid } from "@mui/material";
import { GameMetaData } from "components";
import { BGGGameResponse } from "lib/fetchBggGameById";
import Image from "next/image";

interface Props {
  game: BGGGameResponse;
}

export const GameDetails = ({ game }: Props) => {
  if (!game) return null;

  return (
    <Grid container spacing={4}>
      <Grid item md={5} sm={4} xs={12}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1",
            mb: 2,
          }}
        >
          <Image src={game.imageSrc} alt={game.name} fill />
        </Box>
        <GameMetaData game={game} />
      </Grid>
      <Grid item md={7} sm={8} xs={12}>
        <p>{game.description}</p>
      </Grid>
    </Grid>
  );
};