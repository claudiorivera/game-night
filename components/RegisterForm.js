import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../context/Alert";
import { UserContext } from "../context/User";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { createAlertWithMessage } = useContext(AlertContext);
  const { registerUser } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      setIsFetching(true);
      registerUser(name, email, password);
    } else {
      createAlertWithMessage("Passwords don't match");
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
        color="secondary"
        variant="contained"
        disabled={isFetching}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
