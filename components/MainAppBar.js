import MobileMenu from "@components/MobileMenu";
import { adminLinks, userLinks } from "@config";
import {
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { styled, useTheme } from "@material-ui/core/styles";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

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

const MainAppBar = () => {
  const [session, loading] = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const router = useRouter();
  const isOnLoginPage = router.asPath.startsWith("/auth/login");

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Link href="/" passHref>
          <Title component={"a"}>Game Night</Title>
        </Link>
        {isOnLoginPage ? null : isMobile ? (
          <MobileMenu userLinks={userLinks} adminLinks={adminLinks} />
        ) : loading ? (
          <CircularProgress />
        ) : !session ? (
          <Button color="inherit" onClick={signIn}>
            Login
          </Button>
        ) : (
          <Fragment>
            {userLinks.map(({ title, url }) => (
              <Link key={title} href={url}>
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
            {/* TODO: Create and protect admin routes */}
            {adminLinks.map(({ title, url }) => (
              <Link key={title} href={url}>
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
      </Toolbar>
    </StyledAppBar>
  );
};

export default MainAppBar;
