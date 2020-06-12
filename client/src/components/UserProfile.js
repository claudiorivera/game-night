import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { Container, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const moment = require("moment");
// MongoDB date format: 2020-06-07T00:03:58.562Z

const UserProfile = () => {
  const history = useHistory();
  const { user, deleteUserById } = useContext(GlobalContext);
  const handleDelete = async () => {
    await deleteUserById(user._id);
    history.push("/register");
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
