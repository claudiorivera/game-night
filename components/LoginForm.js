import { Button, Container, styled, Typography } from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

const StyledButton = styled(Button)({
  margin: ".5rem .25rem",
});

const LoginForm = ({ providers }) => {
  const router = useRouter();
  const [session] = useSession();
  if (session) router.push("/");
  return (
    <Container>
      <Typography variant="h5">
        Please login with one of the following:
      </Typography>
      {providers &&
        Object.values(providers)
          .filter((provider) => provider.id !== "email")
          .map((provider) => (
            <StyledButton
              key={provider.id}
              type="submit"
              size="large"
              fullWidth
              color="secondary"
              variant="contained"
              onClick={() => {
                signIn(provider.id);
              }}
            >
              {provider.name}
            </StyledButton>
          ))}
    </Container>
  );
};

export default LoginForm;
