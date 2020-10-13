import useSWR from "swr";
import fetcher from "./fetcher";

const useEvents = () => {
  const { data, mutate } = useSWR("/api/events", fetcher);
  const events = data?.events;
  return [events, { mutate }];
};

export default useEvents;
