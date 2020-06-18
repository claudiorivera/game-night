import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context";

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { loginUser } = useContext(GlobalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
    history.push("/");
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
        color="primary"
        variant="contained"
        disabled={isFetching}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
