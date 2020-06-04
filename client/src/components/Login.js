import React from "react";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link } from "@reach/router";

export const Login = () => {
  return (
    <Container>
      <Typography variant="h5">Log In</Typography>
      <TextField
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
      />
      <TextField
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
      />

      <Button fullWidth color="primary" variant="contained">
        Log In
      </Button>
      <Typography variant="caption" display="block" gutterBottom>
        Don't have an account? <Link to="/register">Register here</Link>.
      </Typography>
    </Container>
  );
};
