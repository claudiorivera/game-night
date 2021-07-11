import useSWR from "swr";
import fetcher from "./fetcher";

const useGame = (gameId: number) => {
  const { data, error, mutate } = useSWR(
    gameId ? `/api/games/${gameId}` : null,
    fetcher
  );
  return {
    game: data?.game,
    gameError: error,
    gameLoading: !error && !data,
    gameMutate: mutate,
  };
};

export default useGame;
