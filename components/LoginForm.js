import { Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../util/fetcher";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { loginUser } = useContext(UserContext);

  const { data, mutate } = useSWR("/api/user/auth", fetcher);

  useEffect(() => {
    if (data) router.push("/");
  }, [data]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    loginUser(email, password);
    mutate();
  };

  return (
    <form onSubmit={handleLogin}>
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
      <TextField
        name="password"
        required
        type="password"
        id="password"
        label="Password"
        placeholder="Enter password"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        size="large"
        fullWidth
        color="secondary"
        variant="contained"
        disabled={isFetching}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;

export async function getStaticProps() {
  const user = { name: "Dummy" };
  return { props: { user } };
}
