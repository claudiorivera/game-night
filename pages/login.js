import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { Fragment, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const LoginPage = () => {
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

export default LoginPage;
