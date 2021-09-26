import { GameDetailsFull } from "components";
import useGame from "hooks/useGame";
import React from "react";
import { IGame } from "types";

interface Props {
  game?: Omit<IGame, "_id">;
  fetchById?: number;
}

export const GameDetails = ({ game, fetchById }: Props) => {
  const { game: fetchedGame } = useGame(fetchById!);
  return <GameDetailsFull game={fetchById ? fetchedGame : game} />;
};
