import React, { useContext } from "react";
import { UserContext } from "../../pages/user/context";
import { Route, Redirect } from "react-router-dom";

// https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
