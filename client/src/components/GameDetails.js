import React, { Fragment } from "react";

const GameDetails = ({ game }) => {
  return (
    <Fragment>
      <h1>{game.name}</h1>
      <img src={game.thumbnailSrc} alt={game.name} />
    </Fragment>
  );
};

export default GameDetails;
