import useSWR from "swr";
import fetcher from "./fetcher";

const useGames = (initialData) => {
  const { data, error, mutate } = useSWR("/api/games", fetcher, initialData);
  console.log(`returning ${JSON.stringify(data, null, 2)}`);
  return {
    games: data?.games,
    gamesError: error,
    gamesLoading: !error && !data,
    gamesMutate: mutate,
  };
};

export default useGames;
