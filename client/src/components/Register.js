import React, { useState, useContext } from "react";
import { GlobalContext } from "../context";
import { Typography, TextField, Container, Button } from "@material-ui/core";
import { Link, navigate } from "@reach/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { registerUser, createAlertWithMessage, clearAlert } = useContext(
    GlobalContext
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      registerUser(name, email, password);
      clearAlert();
      navigate("home");
    } else {
      createAlertWithMessage("Passwords don't match");
    }
  };

  return (
    <Container>
      <Typography variant="h5">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          type="text"
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="email"
          type="email"
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
        <TextField
          name="passwordConfirm"
          required
          type="password"
          id="passwordConfirm"
          label="Confirm password"
          placeholder="Confirm password"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button
          size="large"
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
        >
          Register
        </Button>
      </form>
      <Typography variant="caption" display="block" gutterBottom>
        Already registered? <Link to="/login">Login here</Link>.
      </Typography>
    </Container>
  );
};

export default Register;
