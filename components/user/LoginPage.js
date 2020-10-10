import React, { useState, Fragment } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Container, Typography, Link } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const Login = () => {
  const [formDisplay, setFormDisplay] = useState("login");
  return (
    <Container>
      {formDisplay === "login" && (
        <Fragment>
          <LoginForm />
          <Typography variant="caption">
            Don't have an account?{" "}
            <StyledLink onClick={() => setFormDisplay("register")}>
              Register here
            </StyledLink>
            .
          </Typography>
        </Fragment>
      )}
      {formDisplay === "register" && (
        <Fragment>
          <RegisterForm />
          <Typography variant="caption">
            Already registered?{" "}
            <StyledLink onClick={() => setFormDisplay("login")}>
              Login here
            </StyledLink>
            .
          </Typography>
        </Fragment>
      )}
    </Container>
  );
};

export default Login;
