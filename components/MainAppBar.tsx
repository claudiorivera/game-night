import {
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import { MobileMenu } from "components";
import { adminLinks, userLinks } from "config";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const StyledAppBar = styled(AppBar)({
  marginBottom: "2rem",
});

export const MainAppBar = () => {
  const [session, loading] = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const isOnLoginPage = router.asPath.startsWith("/auth/login");

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            component={"a"}
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Game Night
          </Typography>
        </Link>
        {isOnLoginPage ? null : isMobile ? (
          <MobileMenu userLinks={userLinks} adminLinks={adminLinks} />
        ) : loading ? (
          <CircularProgress />
        ) : !session ? (
          <Button
            color="inherit"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </Button>
        ) : (
          <>
            {userLinks.map(({ title, url }) => (
              <Link key={title} href={url} passHref>
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
            {/* TODO: Create and protect admin routes */}
            {adminLinks.map(({ title, url }) => (
              <Link key={title} href={url} passHref>
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
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};
