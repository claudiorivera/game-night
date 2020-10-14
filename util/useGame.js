import useSWR from "swr";
import fetcher from "./fetcher";

const useGame = (gameId) => {
  const { data, error, mutate } = useSWR(`/api/games/${gameId}`, fetcher);
  return {
    game: data?.game,
    gameError: error,
    gameLoading: !error && !data,
    gameMutate: mutate,
  };
};

export default useGame;
