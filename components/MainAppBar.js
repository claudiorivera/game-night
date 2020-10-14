import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { styled, useTheme } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useSession } from "next-auth/client";

const Title = styled(Typography)({
  flexGrow: 1,
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
});

const StyledAppBar = styled(AppBar)({
  marginBottom: "2rem",
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
];

const MainAppBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const [session] = useSession();

  // https://material-ui.com/components/app-bar/#app-bar-with-menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const logoutUser = () => {
    console.log("dummy logoutUser");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Link href="/" passHref>
          <Title component={"a"}>Game Night</Title>
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
              {session?.user?._id && (
                <Fragment>
                  {userLinks.map(({ url, title }, index) => (
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      logoutUser();
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Fragment>
              )}
              {session?.user?.isAdmin &&
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
              {!session && (
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
        {!isMobile && session?.user?._id && (
          <Fragment>
            {userLinks.map(({ title, url }, index) => (
              <Link key={index} href={url}>
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
            <Button
              color="inherit"
              onClick={() => {
                logoutUser();
              }}
            >
              Log Out
            </Button>
          </Fragment>
        )}
        {/* Admin links */}
        {!isMobile &&
          session?.user?.isAdmin &&
          adminLinks.map(({ title, url }, index) => (
            <Link key={index} href={url}>
              <Button color="inherit">{title}</Button>
            </Link>
          ))}
        {/* Show the Login/Register button if there's no user */}
        {!isMobile && !session && (
          // <Link href="/login">
          //   <Button color="inherit">Login/Register</Button>
          // </Link>
          <div>Login Link Goes Here?</div>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default MainAppBar;
