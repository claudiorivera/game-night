import React, { useContext, Fragment } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../../pages/user/context";

const useStyles = makeStyles({
  mb3: {
    marginBottom: "3vh",
  },
});

const MainAppBar = () => {
  const classes = useStyles();
  const { user, logoutUser } = useContext(UserContext);

  return (
    <AppBar position="sticky" className={classes.mb3}>
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        {/* Show the Games List link if the user is an admin */}
        {user && user.isAdmin && (
          <Button color="inherit" component={Link} to="/games">
            Games
          </Button>
        )}
        {/* Show the Profile and Log Out links if a non-admin user is logged in */}
        {user ? (
          <Fragment>
            <Button color="inherit" component={Link} to="/events">
              Events
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              My Profile
            </Button>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </Fragment>
        ) : (
          // Show the Login/Register link if a user is not logged in
          <Fragment>
            <Button
              className={classes.alignRight}
              component={Link}
              to="/login"
              color="inherit"
            >
              Login/Register
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
