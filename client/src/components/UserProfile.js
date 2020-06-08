import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { Container, Typography, Button } from "@material-ui/core";
import { navigate } from "@reach/router";
const moment = require("moment");
// MongoDB date format: 2020-06-07T00:03:58.562Z

const UserProfile = () => {
  const { user, deleteUserById } = useContext(GlobalContext);
  const handleDelete = () => {
    deleteUserById(user._id);
    navigate("/register");
  };

  return (
    <Container>
      <Typography variant="h5">Name: {user.name}</Typography>
      <Typography variant="h5">Email: {user.email}</Typography>
      <Typography variant="h5">Admin? {user.isAdmin ? "Yes" : "No"}</Typography>
      <Typography variant="h5">
        Date Created: {moment(user.dateCreated).format("MMMM Do, YYYY")}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDelete}>
        Delete My Profile
      </Button>
    </Container>
  );
};

export default UserProfile;
