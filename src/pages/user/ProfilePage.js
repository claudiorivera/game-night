import React, { useContext, Fragment, useEffect, useState } from "react";
import { UserContext } from "./context";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
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

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {user && (
        <Container>
          <Typography variant="h5">Name: {user.name}</Typography>
          <Typography variant="h5">Email: {user.email}</Typography>
          <Typography variant="h5">
            Admin? {user.isAdmin ? "Yes" : "No"}
          </Typography>
          <Typography variant="h5">
            Date Created: {moment(user.dateCreated).format("MMMM Do, YYYY")}
          </Typography>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            size="large"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete My Profile
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your profile?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </Fragment>
  );
};

export default ProfilePage;
