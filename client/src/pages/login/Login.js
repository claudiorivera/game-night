import React, { useContext } from "react";
import { LoginForm, RegisterForm } from "./";
import { Container } from "@material-ui/core";

const Login = () => {
  return (
    <Container>
      <LoginForm />
      <RegisterForm />
    </Container>
  );
};

export default Login;
