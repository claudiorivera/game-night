import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  const { alert, clearAlert } = useContext(GlobalContext);
  return alert ? (
    <div className={classes.root}>
      <Alert
        onClose={() => {
          clearAlert();
        }}
        severity="error"
      >
        <AlertTitle>alert</AlertTitle>
        {JSON.stringify(alert)}
      </Alert>
    </div>
  ) : (
    <div></div>
  );
};

export default AlertDialog;
