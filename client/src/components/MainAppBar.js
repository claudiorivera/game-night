import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Game Night
        </Typography>
        <Button component={Link} to="login" color="inherit">
          Login
        </Button>
        <Button component={Link} to="register" color="inherit">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
