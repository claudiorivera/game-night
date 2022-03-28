import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";

type SignInFormProps = {
  providers: typeof getProviders;
};
export const SignInForm = ({ providers }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <Typography variant="h5">
        Please sign in with one of the following:
      </Typography>
      {providers &&
        Object.values(providers)
          .filter((provider) => provider.id !== "email")
          .map((provider) => (
            <Button
              sx={{
                margin: ".5rem 0",
              }}
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
            </Button>
          ))}
      <Divider
        sx={{
          margin: "1.5rem",
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsFetching(true);
          signIn("email", { email });
        }}
      >
        <TextField
          name="email"
          required
          id="email"
          label="Email"
          placeholder="Or enter your email here to receive a sign in link"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          sx={{
            margin: ".5rem 0",
          }}
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          disabled={isFetching}
        >
          {isFetching ? <CircularProgress /> : "Send Me A Sign In Link"}
        </Button>
      </form>
    </>
  );
};
