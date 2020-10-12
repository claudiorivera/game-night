import { Container, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { Fragment, useContext } from "react";
import { AlertContext } from "../context/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertDialog = () => {
  const classes = useStyles();
  const { message, clearAlert } = useContext(AlertContext);
  return message ? (
    <Container className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={3000}
        onClose={() => {
          clearAlert();
        }}
      >
        <Alert
          onClose={() => {
            clearAlert();
          }}
          severity="warning"
        >
          <AlertTitle>Alert</AlertTitle>
          {JSON.stringify(message)}
        </Alert>
      </Snackbar>
    </Container>
  ) : (
    <Fragment></Fragment>
  );
};

export default AlertDialog;
