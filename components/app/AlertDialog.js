import React, { useContext, Fragment } from "react";
import { AppContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Container, Snackbar } from "@material-ui/core";

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
  const { message, clearAlert } = useContext(AppContext);
  return message ? (
    <Container className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={5000}
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
