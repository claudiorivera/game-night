import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { GameMetaData } from "components";
import Image from "next/image";
import React from "react";
import { IGame } from "types";

interface Props {
  game: IGame;
}

export const GameDetailsFull = ({ game }: Props) => {
  if (!game) return <CircularProgress size={100} thickness={4} />;

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
