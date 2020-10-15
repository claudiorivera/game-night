import useSWR from "swr";
import fetcher from "./fetcher";

const useEvent = (eventId, initialData) => {
  const { data, error, mutate } = useSWR(
    `/api/events/${eventId}`,
    fetcher,
    initialData
  );
  return {
    event: data?.event,
    eventError: error,
    eventLoading: !error && !data,
    eventMutate: mutate,
  };
};

export default useEvent;
