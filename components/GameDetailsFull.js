import GameMetaData from "@components/GameMetaData";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";

const GameDetailsFull = ({ game }) => {
  return game ? (
    <Grid container spacing={4}>
      <Grid item md={5} sm={4} xs={12}>
        <img src={game.imageSrc} alt={game.name} style={{ width: "100%" }} />
        <GameMetaData game={game} />
      </Grid>
      <Grid item md={7} sm={8} xs={12}>
        <Typography variant="body1">{game.description}</Typography>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress size={200} thickness={4} />
  );
};

export default GameDetailsFull;
