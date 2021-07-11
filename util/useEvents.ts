import useSWR from "swr";
import fetcher from "./fetcher";

const useEvents = (initialData: any) => {
  const { data, error, mutate } = useSWR("/api/events", fetcher, initialData);
  return {
    events: data?.events,
    eventsError: error,
    eventsLoading: !error && !data,
    eventsMutate: mutate,
  };
};

export default useEvents;
