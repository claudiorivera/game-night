import axios from "axios";
import useSWR from "swr";

export const fetcher = (url) =>
  axios.get(url).then((response) => response.data);

const useCurrentUser = () => {
  const { data, mutate } = useSWR("/api/user/auth", fetcher);
  const user = data?.user;
  return [user, { mutate }];
};

export default useCurrentUser;
