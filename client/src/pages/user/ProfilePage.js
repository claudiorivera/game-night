import React, { useContext, Fragment, useEffect } from "react";
import { UserContext } from "./context";
import { Container, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const moment = require("moment");

const ProfilePage = () => {
  const history = useHistory();
  const { user, deleteUserById, authUser } = useContext(UserContext);
  const handleDelete = async () => {
    await deleteUserById(user._id);
    history.push("/register");
  };

  useEffect(() => {
    authUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {user && (
        <Fragment>
          <Container>
            <Typography variant="h5">Name: {user.name}</Typography>
            <Typography variant="h5">Email: {user.email}</Typography>
            <Typography variant="h5">
              Admin? {user.isAdmin ? "Yes" : "No"}
            </Typography>
            <Typography variant="h5">
              Date Created: {moment(user.dateCreated).format("MMMM Do, YYYY")}
            </Typography>
          </Container>
          <Container>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              size="large"
              onClick={handleDelete}
            >
              Delete My Profile
            </Button>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfilePage;
