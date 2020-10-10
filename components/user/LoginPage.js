import React, { useState, Fragment } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Container, Typography, Link } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const TextLink = styled(Link)({
  cursor: "pointer",
});

const Login = () => {
  const [formDisplay, setFormDisplay] = useState("login");
  return (
    <Container>
      {formDisplay === "login" && (
        <Fragment>
          <LoginForm />
          <Typography variant="caption" align="center">
            Don't have an account?{" "}
            <TextLink onClick={() => setFormDisplay("register")}>
              Register here
            </TextLink>
            .
          </Typography>
        </Fragment>
      )}
      {formDisplay === "register" && (
        <Fragment>
          <RegisterForm />
          <Typography variant="caption" align="center">
            Already registered?{" "}
            <TextLink onClick={() => setFormDisplay("login")}>
              Login here
            </TextLink>
            .
          </Typography>
        </Fragment>
      )}
    </Container>
  );
};

export default Login;
