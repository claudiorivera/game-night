import useSWR from "swr";
import fetcher from "util/fetcher";

const useEvent = (eventId: string | undefined) => {
  const { data, error, mutate } = useSWR(
    eventId ? `/api/events/${eventId}` : null,
    fetcher
  );
  return {
    event: data?.event,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useEvent;
