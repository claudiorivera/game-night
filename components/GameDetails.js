import GameDetailsFull from "@components/GameDetailsFull";
import useGame from "@util/useGame";
import React from "react";

const GameDetails = ({ game, fetchById }) => {
  const { game: fetchedGame } = useGame(fetchById);
  return <GameDetailsFull game={fetchById ? fetchedGame : game} />;
};

export default GameDetails;
