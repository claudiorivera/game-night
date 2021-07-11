import useSWR from "swr";
import fetcher from "./fetcher";

const useGames = (initialData: any) => {
  const { data, error, mutate } = useSWR("/api/games", fetcher, initialData);
  return {
    games: data?.games,
    gamesError: error,
    gamesLoading: !error && !data,
    gamesMutate: mutate,
  };
};

export default useGames;
