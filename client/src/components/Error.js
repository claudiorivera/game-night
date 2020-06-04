import React from "react";
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

const Error = ({ errors }) => {
  const classes = useStyles();

  return errors.length > 0 ? (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      </Alert>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({ errors: state.errors });

export default connect(mapStateToProps)(Error);
