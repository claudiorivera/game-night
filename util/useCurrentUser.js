import useSWR from "swr";
import fetcher from "./fetcher";

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR("/api/user/auth", fetcher);
  const user = data?.user;
  return { user, userError: error, userMutate: mutate };
};

export default useCurrentUser;
