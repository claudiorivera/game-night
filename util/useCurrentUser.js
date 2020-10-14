import useSWR from "swr";
import fetcher from "./fetcher";

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR("/api/user/auth", fetcher);
  return {
    user: data?.user,
    userError: error,
    userLoading: !error && !data,
    userMutate: mutate,
  };
};

export default useCurrentUser;
