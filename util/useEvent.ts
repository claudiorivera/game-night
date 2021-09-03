import useSWR from "swr";
import fetcher from "./fetcher";

const useEvent = (eventId: string, initialData: any) => {
  const { data, error, mutate } = useSWR(
    eventId ? `/api/events/${eventId}` : null,
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
