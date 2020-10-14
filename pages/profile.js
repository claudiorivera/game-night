import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useSession } from "next-auth/client";

const ProfilePage = () => {
  const [session] = useSession();
  const deleteUserById = () => {
    console.log("dummy deleteUserById");
  };
  const handleDelete = () => {
    deleteUserById(session.user._id);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  if (!session)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h5">Name: {session.user.name}</Typography>
      <Typography variant="h5">Email: {session.user.email}</Typography>
      <Typography variant="h5">
        Admin? {session.user.isAdmin ? "Yes" : "No"}
      </Typography>
      <Typography variant="h5">
        Date Created: {moment(session.user.dateCreated).format("MMMM Do, YYYY")}
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
  );
};

export default ProfilePage;
