import React, { useState, Fragment } from "react";
import { LoginForm, RegisterForm } from "./";
import { Container, Typography } from "@material-ui/core";

const Login = () => {
  const [formDisplay, setFormDisplay] = useState("login");
  return (
    <Container>
      {formDisplay === "login" && (
        <Fragment>
          <LoginForm />
          <Typography variant="caption">
            Don't have an account? Register here.
          </Typography>
          <button onClick={() => setFormDisplay("register")}>Register</button>
        </Fragment>
      )}
      {formDisplay === "register" && (
        <Fragment>
          <RegisterForm />
          <Typography variant="caption">
            Already registered? Login here.
          </Typography>
          <button onClick={() => setFormDisplay("login")}>Login</button>
        </Fragment>
      )}
    </Container>
  );
};

export default Login;
