import useSWR from "swr";
import fetcher from "util/fetcher";

const useEvents = () => {
  const { data, error, mutate } = useSWR("/api/events", fetcher);
  return {
    events: data?.events,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useEvents;
