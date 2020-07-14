import React, { useContext } from "react";
import { UserContext } from "../user/context";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = () => {
  const { logoutUser } = useContext(UserContext);

  useEffect(() => {
    logoutUser();
    //eslint-disable-next-line
  }, []);

  return <Redirect to="/login" />;
};

export default LogoutPage;
