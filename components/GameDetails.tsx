import GameDetailsFull from "@components/GameDetailsFull";
import { Game } from "@models/Game";
import useGame from "@util/useGame";
import React from "react";

interface Props {
  game?: Omit<Game, "_id">;
  fetchById?: number;
}

const GameDetails = ({ game, fetchById }: Props) => {
  const { game: fetchedGame } = useGame(fetchById!);
  return <GameDetailsFull game={fetchById ? fetchedGame : game} />;
};

export default GameDetails;
