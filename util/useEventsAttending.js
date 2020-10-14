import useSWR from "swr";
import fetcher from "./fetcher";

const useEventsAttending = (userId) => {
  const { data, error, mutate } = useSWR(
    `/api/user/${userId}?events=attending`,
    fetcher
  );
  return {
    userEventsAttending: data?.events,
    userEventsAttendingError: error,
    userEventsAttendingLoading: !error && !data,
    userEventsAttendingMutate: mutate,
  };
};

export default useEventsAttending;
