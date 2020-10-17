import { Button, Container, styled, Typography } from "@material-ui/core";
import { signIn } from "next-auth/client";
import React from "react";

const StyledButton = styled(Button)({
  margin: ".5rem .25rem",
});

const LoginForm = ({ providers }) => {
  return (
    <Container>
      <Typography variant="h4">
        Please login using one of the following options:
      </Typography>
      {providers &&
        Object.values(providers).map((provider) => (
          <StyledButton
            key={provider.id}
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              signIn(provider.id, { callbackUrl: process.env.BASE_URL });
            }}
          >
            {provider.name}
          </StyledButton>
        ))}
    </Container>
  );
};

export default LoginForm;
