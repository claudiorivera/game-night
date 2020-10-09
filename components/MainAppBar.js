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
import { UserContext } from "../components/user/context";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
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
        <Link href="/" passHref>
          <Typography className={styles.title} component={"a"}>
            Game Night
          </Typography>
        </Link>
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
              {user?._id &&
                userLinks.map(({ title, url }, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClose();
                      router.push(url);
                    }}
                  >
                    {title}
                  </MenuItem>
                ))}
              {user?.isAdmin &&
                adminLinks.map(({ title, url }, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClose();
                      router.push(url);
                    }}
                  >
                    {title}
                  </MenuItem>
                ))}
              {!user && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/login");
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
          user?._id &&
          userLinks.map(({ title, url }, index) => (
            <Link key={index} href={url}>
              <Button color="inherit">{title}</Button>
            </Link>
          ))}
        {/* Admin links */}
        {!isMobile &&
          user?.isAdmin &&
          adminLinks.map(({ title, url }, index) => (
            <Link key={index} href={url}>
              <Button color="inherit">{title}</Button>
            </Link>
          ))}
        {/* Show the Login/Register button if there's no user */}
        {!isMobile && !user && (
          <Link href="/login">
            <Button color="inherit">Login/Register</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
