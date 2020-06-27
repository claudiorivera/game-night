import React, { useContext } from "react";
import { UserContext } from "../../pages/user/context";
import { Route, Redirect } from "react-router-dom";

// https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ children, ...rest }) {
  const { authUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
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
}

export default PrivateRoute;
