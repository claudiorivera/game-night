import {
  Button,
  Container,
  Divider,
  styled,
  TextField,
  Typography,
} from "@material-ui/core";
import { signIn } from "next-auth/client";
import React, { useState } from "react";

const StyledButton = styled(Button)({
  margin: ".5rem .25rem",
});

const StyledDivider = styled(Divider)({
  margin: "1.5rem",
});

const LoginForm = ({ providers }) => {
  const [email, setEmail] = useState("");
  return (
    <Container>
      <Typography variant="h4">
        Please login using one of the following options:
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
                signIn(provider.id, { callbackUrl: process.env.BASE_URL });
              }}
            >
              {provider.name}
            </StyledButton>
          ))}
      <StyledDivider />
      <TextField
        name="email"
        required
        id="email"
        label="Email"
        placeholder="Enter email"
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
        onClick={() => {
          signIn("email", { email, callbackUrl: process.env.BASE_URL });
        }}
      >
        Send Me A Login Link
      </StyledButton>
    </Container>
  );
};

export default LoginForm;
