import { Grid, Typography } from "@mui/material";
import { Game } from "@prisma/client";
import { GameMetaData } from "components";
import Image from "next/image";
import { BGGGameResponse } from "types";

interface Props {
  game: Game | BGGGameResponse;
}

export const GameDetails = ({ game }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item md={5} sm={4} xs={12}>
        <Image src={game.imageSrc} alt={game.name} width={500} height={500} />
        <GameMetaData game={game} />
      </Grid>
      <Grid item md={7} sm={8} xs={12}>
        <Typography variant="body1">{game.description}</Typography>
      </Grid>
    </Grid>
  );
};
