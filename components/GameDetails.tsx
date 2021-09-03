import { GameDetailsFull } from "components";
import React from "react";
import { IGame } from "types";
import useGame from "util/useGame";

interface Props {
  game?: Omit<IGame, "_id">;
  fetchById?: number;
}

export const GameDetails = ({ game, fetchById }: Props) => {
  const { game: fetchedGame } = useGame(fetchById!);
  return <GameDetailsFull game={fetchById ? fetchedGame : game} />;
};
