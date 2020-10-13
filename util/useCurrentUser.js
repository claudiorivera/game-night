import useSWR from "swr";
import fetcher from "./fetcher";

const useCurrentUser = () => {
  const { data, mutate } = useSWR("/api/user/auth", fetcher);
  const user = data?.user;
  return [user, { mutate }];
};

export default useCurrentUser;
