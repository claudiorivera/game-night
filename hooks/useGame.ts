import useSWR from "swr";
import fetcher from "util/fetcher";

const useGame = (gameId: number) => {
  const { data, error, mutate } = useSWR(
    gameId ? `/api/games/${gameId}` : null,
    fetcher
  );
  return {
    game: data?.game,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useGame;
