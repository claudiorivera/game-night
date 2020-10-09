import React, { useState, Fragment } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Container, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textLink: {
    cursor: "pointer",
  },
});

const Login = () => {
  const classes = useStyles();
  const [formDisplay, setFormDisplay] = useState("login");
  return (
    <Container>
      {formDisplay === "login" && (
        <Fragment>
          <LoginForm />
          <Typography variant="caption">
            Don't have an account?{" "}
            <Link
              href="#"
              onClick={() => setFormDisplay("register")}
              className={classes.textLink}
            >
              Register here
            </Link>
            .
          </Typography>
        </Fragment>
      )}
      {formDisplay === "register" && (
        <Fragment>
          <RegisterForm />
          <Typography variant="caption">
            Already registered?{" "}
            <Link
              href="#"
              onClick={() => setFormDisplay("login")}
              className={classes.textLink}
            >
              Login here
            </Link>
            .
          </Typography>
        </Fragment>
      )}
    </Container>
  );
};

export default Login;
