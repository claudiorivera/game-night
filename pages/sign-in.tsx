import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

type SignInPageProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
export const SignInPage = ({ providers }: SignInPageProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
                signIn(provider.id, { callbackUrl: "/" });
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
          setIsLoading(true);
          signIn("email", { email, callbackUrl: "/" });
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
        <Button
          sx={{
            margin: ".5rem 0",
          }}
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress /> : "Send sign-in link"}
        </Button>
      </form>
    </>
  );
};

export default SignInPage;
