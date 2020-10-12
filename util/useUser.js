import useSWR from "swr";
import axios from "axios";

export const fetcher = (url) =>
  axios.get(url).then((response) => response.data);

const useUser = () => {
  const { data, mutate } = useSWR("/api/user/auth", fetcher);
  const user = data?.user;
  return [user, { mutate }];
};

export default useUser;
