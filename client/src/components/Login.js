import React, { useState, useContext } from "react";
import { GlobalContext } from "../context";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logInWithEmailAndPassword, checkIsAuthenticated } = useContext(
    GlobalContext
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <Container>
      <Typography variant="h5">Log In</Typography>
      <form onSubmit={handleSubmit}>
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
        >
          Log In
        </Button>
        <Button
          size="large"
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            checkIsAuthenticated();
          }}
        >
          Check
        </Button>
      </form>
      <Typography variant="caption" display="block" gutterBottom>
        Don't have an account? <Link to="/register">Register here</Link>.
      </Typography>
    </Container>
  );
};

export default Login;
