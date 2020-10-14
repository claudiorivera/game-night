import useSWR from "swr";
import fetcher from "./fetcher";

const useEvents = () => {
  const { data, error, mutate } = useSWR("/api/events", fetcher);
  const events = data?.events;
  return { events, eventsError: error, eventsMutate: mutate };
};

export default useEvents;
