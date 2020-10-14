import useSWR from "swr";
import fetcher from "./fetcher";

const useGames = () => {
  const { data, error, mutate } = useSWR("/api/games", fetcher);
  const games = data?.games;
  return { games, gamesError: error, gamesMutate: mutate };
};

export default useGames;
