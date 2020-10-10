import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../components/app/context";
import { UserContext } from "../components/user/context";
import ProfilePage from "../components/user/ProfilePage";

const profile = () => {
  const router = useRouter();
  const { authUser, user } = useContext(UserContext);
  const { createAlertWithMessage } = useContext(AppContext);

  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (!user) {
      createAlertWithMessage("You must be logged in to view this page.");
      router.push("/login");
    }
  }, [user]);

  return <>{user?._id && <ProfilePage />}</>;
};

export default profile;
