import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../../pages/user/context";

const useStyles = makeStyles({
  mb3: {
    marginBottom: "3vh",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
    fontWeight: 700,
    fontSize: "1.5rem",
  },
});

const adminLinks = [
  {
    title: "Games",
    url: "/games",
  },
];

const userLinks = [
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "My Profile",
    url: "/profile",
  },
  {
    title: "Log Out",
    url: "/logout",
  },
];

const MainAppBar = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <AppBar position="sticky" className={classes.mb3}>
      <Toolbar>
        <Typography className={classes.title} component={Link} to="/">
          Game Night
        </Typography>
        {/* Admin links */}
        {user &&
          user.isAdmin &&
          adminLinks.map(({ title, url }, index) => (
            <Button key={index} color="inherit" component={Link} to={url}>
              {title}
            </Button>
          ))}
        {/* User links */}
        {user &&
          user._id &&
          userLinks.map(({ title, url }, index) => (
            <Button key={index} color="inherit" component={Link} to={url}>
              {title}
            </Button>
          ))}
        {/* Show the Login/Register button if there's no user */}
        {!user && (
          <Button
            className={classes.alignRight}
            component={Link}
            to="/login"
            color="inherit"
          >
            Login/Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
