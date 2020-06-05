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

const DescriptionAlerts = () => {
  const classes = useStyles();
  const { error, clearError } = useContext(GlobalContext);
  return error ? (
    <div className={classes.root}>
      <Alert
        onClose={() => {
          clearError();
        }}
        severity="error"
      >
        <AlertTitle>Error</AlertTitle>
        {JSON.stringify(error)}
      </Alert>
    </div>
  ) : (
    <div></div>
  );
};

export default DescriptionAlerts;
