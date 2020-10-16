import React from "react";
import useGame from "../util/useGame";
import GameDetailsFull from "./GameDetailsFull";

const GameDetails = ({ game, fetchById }) => {
  if (fetchById) {
    const { game } = useGame(gameId);
    return <GameDetailsFull game={game} />;
  } else {
    return <GameDetailsFull game={game} />;
  }
};

export default GameDetails;
