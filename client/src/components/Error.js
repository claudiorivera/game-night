import React, { Fragment } from "react";
import { connect } from "react-redux";
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

const Error = ({ error }) => {
  const classes = useStyles();

  return error && error.message ? (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    </div>
  ) : (
    <Fragment></Fragment>
  );
};

const mapStateToProps = (state) => ({ error: state.error });

export default connect(mapStateToProps)(Error);
