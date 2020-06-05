import React from "react";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Error } from "../components";

const Login = ({ errors }) => {
  return (
    <Container>
      <Typography variant="h5">Log In</Typography>
      <Error />
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
      />

      <Button size="large" fullWidth color="primary" variant="contained">
        Log In
      </Button>
      <Typography variant="caption" display="block" gutterBottom>
        Don't have an account? <Link to="/register">Register here</Link>.
      </Typography>
    </Container>
  );
};

const mapStateToProps = (state) => ({ errors: state.errors });

export default connect(mapStateToProps)(Login);
