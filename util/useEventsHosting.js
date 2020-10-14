import useSWR from "swr";
import fetcher from "./fetcher";

const useEventsHosting = (userId) => {
  const { data, error, mutate } = useSWR(
    `/api/user/${userId}?events=hosting`,
    fetcher
  );
  return {
    userEventsHosting: data?.events,
    userEventsHostingError: error,
    userEventsHostingLoading: !error && !data,
    userEventsHostingMutate: mutate,
  };
};

export default useEventsHosting;
