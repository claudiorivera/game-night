import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../context";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  mb3: {
    marginBottom: "3vh",
  },
});

const MainAppBar = () => {
  const classes = useStyles();
  const { user, logoutUser } = useContext(GlobalContext);

  return (
    <AppBar position="sticky" className={classes.mb3}>
      <Toolbar>
        <Button component={Link} to="/home" color="inherit">
          Home
        </Button>
        {/* Show the Add Game link if the user is an admin */}
        {user && user.isAdmin && (
          <Button color="inherit" component={Link} to="/games/add">
            Add Game
          </Button>
        )}
        {/* Show the Profile and Log Out links if a user is logged in */}
        {user ? (
          <Fragment>
            <Button color="inherit" component={Link} to="/profile">
              My Profile
            </Button>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </Fragment>
        ) : (
          // Show the Login and Register links if a user is not logged in
          <Fragment>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
