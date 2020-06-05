import React, { useState } from "react";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Error } from "../components";

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      await dispatch({
        type: "LOGIN_USER_REQUESTED",
        payload,
      });
    } catch (error) {
      dispatch({ type: "LOGIN_USER_FAILED", payload: error });
    }
  };

  return (
    <Container>
      <Typography variant="h5">Log In</Typography>
      <Error />
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
      </form>
      <Typography variant="caption" display="block" gutterBottom>
        Don't have an account? <Link to="/register">Register here</Link>.
      </Typography>
    </Container>
  );
};

export default connect()(Login);
