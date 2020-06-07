import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../context";
import { Login } from "../components";

// https://github.com/reach/router/issues/185#issuecomment-453544852
const PrivateRoute = ({ as: Component, ...props }) => {
  const { user } = useContext(GlobalContext);

  return (
    <Fragment>
      {user ? (
        <Component {...props} />
      ) : (
        <Fragment>
          <Login />
        </Fragment>
      )}
    </Fragment>
  );
};

export default PrivateRoute;
