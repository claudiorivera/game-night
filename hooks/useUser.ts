import useSWR from "swr";
import fetcher from "util/fetcher";

const useUser = (userId: string | undefined) => {
  const {
    data: user,
    error: userError,
    mutate,
  } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  const { data: eventsHosting, error: eventsHostingError } = useSWR(
    userId ? `/api/users/${userId}/events?hosting` : null,
    fetcher
  );
  const { data: eventsAttending, error: eventsAttendingError } = useSWR(
    userId ? `/api/users/${userId}/events` : null,
    fetcher
  );

  const data = user && eventsHosting && eventsAttending;
  const error = userError || eventsHostingError || eventsAttendingError;

  return {
    user,
    eventsHosting,
    eventsAttending,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useUser;
