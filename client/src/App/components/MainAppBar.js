import React, { useContext, Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../pages/user/context";

const useStyles = makeStyles((theme) => ({
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
}));

const adminLinks = [
  {
    title: "Games",
    url: "/games",
  },
];

const userLinks = [
  {
    title: "Home",
    url: "/",
  },
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
  const history = useHistory();
  const theme = useTheme();
  const styles = useStyles();
  const { user } = useContext(UserContext);
  // https://material-ui.com/components/app-bar/#app-bar-with-menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" className={styles.mb3}>
      <Toolbar>
        <Typography className={styles.title} component={Link} to="/">
          Game Night
        </Typography>
        {/* Mobile menu */}
        {isMobile && (
          <Fragment>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {user &&
                user._id &&
                userLinks.map(({ title, url }, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClose();
                      history.push(url);
                    }}
                  >
                    {title}
                  </MenuItem>
                ))}
              {user &&
                user.isAdmin &&
                adminLinks.map(({ title, url }, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClose();
                      history.push(url);
                    }}
                  >
                    {title}
                  </MenuItem>
                ))}
              {!user && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push("/login");
                  }}
                >
                  Login/Register
                </MenuItem>
              )}
            </Menu>
          </Fragment>
        )}
        {/* Desktop menu */}
        {/* User links */}
        {!isMobile &&
          user &&
          user._id &&
          userLinks.map(({ title, url }, index) => (
            <Button key={index} color="inherit" component={Link} to={url}>
              {title}
            </Button>
          ))}
        {/* Admin links */}
        {!isMobile &&
          user &&
          user.isAdmin &&
          adminLinks.map(({ title, url }, index) => (
            <Button key={index} color="inherit" component={Link} to={url}>
              {title}
            </Button>
          ))}
        {/* Show the Login/Register button if there's no user */}
        {!isMobile && !user && (
          <Button
            className={styles.alignRight}
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
