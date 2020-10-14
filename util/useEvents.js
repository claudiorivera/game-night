import useSWR from "swr";
import fetcher from "./fetcher";

const useEvents = () => {
  const { data, error, mutate } = useSWR("/api/events", fetcher);
  return {
    events: data?.events,
    eventsError: error,
    eventsLoading: !error && !data,
    eventsMutate: mutate,
  };
};

export default useEvents;
