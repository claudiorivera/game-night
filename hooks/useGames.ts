import useSWR from "swr";
import { IGame } from "types";
import fetcher from "util/fetcher";

const useGames = () => {
  const { data, error, mutate } = useSWR("/api/games", fetcher);
  return {
    games: data?.games as IGame[],
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useGames;
