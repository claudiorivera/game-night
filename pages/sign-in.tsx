import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const SignInPage = () => {
  const router = useRouter();
  const { callbackUrl } = router.query as { callbackUrl: string };
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Welcome to Game Night! Sign in to get started.
      </Typography>
      <LoadingButton
        sx={{
          my: 1,
        }}
        size="large"
        fullWidth
        color="secondary"
        variant="contained"
        onClick={() => {
          setIsLoading(true);
          signIn("credentials", { callbackUrl });
        }}
        disabled={isLoading}
        loading={isLoading}
      >
        Sign In As Demo User
      </LoadingButton>
      <LoadingButton
        sx={{
          my: 1,
        }}
        size="large"
        fullWidth
        color="secondary"
        variant="contained"
        onClick={() => {
          setIsLoading(true);
          signIn("github", { callbackUrl });
        }}
        disabled={isLoading}
        loading={isLoading}
      >
        Sign In With GitHub
      </LoadingButton>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          signIn("email", { email, callbackUrl });
        }}
      >
        <TextField
          name="email"
          required
          id="email"
          label="Email"
          placeholder="email@example.com"
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
          disabled={isLoading}
          loading={isLoading}
        >
          Sign In With Email
        </LoadingButton>
      </form>
    </>
  );
};

export default SignInPage;
