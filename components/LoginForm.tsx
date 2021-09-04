import { CircularProgress, TextField, Typography } from "@mui/material";
import { StyledButton, StyledDivider } from "components";
import { getProviders, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  providers: typeof getProviders;
}

export const LoginForm = ({ providers }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  if (session) router.push("/");

  return (
    <>
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
          setIsFetching(true);
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
          disabled={isFetching}
        >
          {isFetching ? <CircularProgress /> : "Send Me A Login Link"}
        </StyledButton>
      </form>
    </>
  );
};
