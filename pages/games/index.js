import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../components/app/context";
import GamesListPage from "../../components/games/GamesListPage";
import { UserContext } from "../../components/user/context";

const games = () => {
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

  return <>{user?._id && <GamesListPage />}</>;
};

export default games;
