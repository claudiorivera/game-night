import useSWR from "swr";
import fetcher from "./fetcher";

const useEvent = (eventId) => {
  const { data, error, mutate } = useSWR(`/api/events/${eventId}`, fetcher);
  return {
    event: data?.event,
    eventError: error,
    eventLoading: !error && !data,
    eventMutate: mutate,
  };
};

export default useEvent;
