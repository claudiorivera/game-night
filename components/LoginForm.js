import {
  Button,
  Container,
  Divider,
  styled,
  TextField,
  Typography,
} from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import React, { useState } from "react";
import { useRouter } from "next/router";

const StyledButton = styled(Button)({
  margin: ".5rem .25rem",
});

const StyledDivider = styled(Divider)({
  margin: "1.5rem",
});

const LoginForm = ({ providers }) => {
  const router = useRouter();
  const [session] = useSession();
  const [email, setEmail] = useState("");
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
      <StyledDivider />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("email", { email });
        }}
      >
        <TextField
          name="email"
          required
          id="email"
          label="Email"
          placeholder="Or enter your email here to receive a login link"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledButton
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
        >
          Send Me A Login Link
        </StyledButton>
      </form>
    </Container>
  );
};

export default LoginForm;
