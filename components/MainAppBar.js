import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { styled, useTheme } from "@material-ui/core/styles";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import MobileMenu from "./MobileMenu";

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

const adminLinks = [];

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
    title: "Games",
    url: "/games",
  },
];

const MainAppBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const [session] = useSession();

  // https://material-ui.com/components/app-bar/#app-bar-with-menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
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
          <MobileMenu
            session={session}
            router={router}
            userLinks={userLinks}
            adminLinks={adminLinks}
            isMobileMenuOpen={isMobileMenuOpen}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        )}
        {/* Desktop menu */}
        {/* User links */}
        {!isMobile && session && (
          <Fragment>
            {userLinks.map(({ title, url }, index) => (
              <Link key={index} href={url}>
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
            <Button
              color="inherit"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </Button>
          </Fragment>
        )}
        {/* Admin links */}
        {/* TODO: Secure admin routes */}
        {!isMobile &&
          adminLinks.map(({ title, url }, index) => (
            <Link key={index} href={url}>
              <Button color="inherit">{title}</Button>
            </Link>
          ))}
        {/* Show the Login/Register button if there's no user */}
        {!isMobile && !session && (
          <Link href="/api/auth/signin">
            <Button color="inherit">Login/Register</Button>
          </Link>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default MainAppBar;
