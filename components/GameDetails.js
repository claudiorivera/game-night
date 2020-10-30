import GameDetailsFull from "@components/GameDetailsFull";
import useGame from "@util/useGame";
import React from "react";

const GameDetails = ({ game, fetchById }) => {
  if (fetchById) {
    const { game } = useGame(fetchById);
    return <GameDetailsFull game={game} />;
  } else {
    return <GameDetailsFull game={game} />;
  }
};

export default GameDetails;
