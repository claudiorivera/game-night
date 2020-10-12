import { useContext } from "react";
import { UserContext } from "../user/context";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LogoutPage = () => {
  const router = useRouter();
  const { logoutUser } = useContext(UserContext);

  useEffect(() => {
    logoutUser();
    router.push("/login");
  }, []);

  return null;
};

export default LogoutPage;
