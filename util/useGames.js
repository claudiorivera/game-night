import useSWR from "swr";
import fetcher from "./fetcher";

const useGames = () => {
  const { data, mutate } = useSWR("/api/games", fetcher);
  const games = data?.games;
  return [games, { mutate }];
};

export default useGames;
