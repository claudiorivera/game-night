import { Button, Container, Typography } from "@material-ui/core";
import { signIn } from "next-auth/client";
import React from "react";

const LoginForm = ({ providers }) => {
  return (
    <Container>
      <Typography variant="h4">
        Please login using one of the following options:
      </Typography>
      {providers &&
        Object.values(providers).map((provider, index) => (
          <Button
            key={index}
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "http://localhost:3000/" });
            }}
          >
            {provider.name}
          </Button>
        ))}
    </Container>
  );
};

export default LoginForm;
