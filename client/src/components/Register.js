import React from "react";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link } from "@reach/router";

export const Register = () => {
  return (
    <Container>
      <Typography variant="h5">Register</Typography>
      <TextField
        required
        id="name"
        label="Name"
        placeholder="Enter Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
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
      <TextField
        required
        type="password"
        id="password2"
        label="Confirm password"
        placeholder="Confirm password"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Button fullWidth color="primary" variant="contained">
        Register
      </Button>
      <Typography variant="caption" display="block" gutterBottom>
        Already registered? <Link to="/login">Login here</Link>.
      </Typography>
    </Container>
  );
};
