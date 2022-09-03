import { LoadingButton } from "@mui/lab";
import { Divider, TextField, Typography } from "@mui/material";
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
            <LoadingButton
              sx={{
                my: 1,
              }}
              key={provider.id}
              type="submit"
              size="large"
              fullWidth
              color="secondary"
              variant="contained"
              disabled={isFetching}
              loading={isFetching}
              onClick={() => {
                setIsFetching(true);
                signIn(provider.id);
              }}
            >
              {provider.name}
            </LoadingButton>
          ))}
      <Divider
        sx={{
          m: 2,
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
        <LoadingButton
          sx={{
            my: 1,
          }}
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          disabled={isFetching}
          loading={isFetching}
        >
          Send Me A Sign In Link
        </LoadingButton>
      </form>
    </>
  );
};
