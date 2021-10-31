import {
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, MobileMenu } from "components";
import { adminLinks, userLinks } from "config";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const MainAppBar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const isOnSignInPage = router.asPath.startsWith("/auth/signin");

  return (
    <AppBar position="sticky" sx={{ marginBottom: "1rem" }}>
      <Toolbar>
        <Link href="/" sx={{ marginRight: "auto" }}>
          <Typography
            sx={{
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
        {isOnSignInPage ? null : isMobile ? (
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
            Sign In
          </Button>
        ) : (
          <>
            {userLinks.map(({ title, url }) => (
              <Button
                color="inherit"
                key={title}
                onClick={() => {
                  router.push(url);
                }}
              >
                {title}
              </Button>
            ))}
            {/* TODO: Create and protect admin routes */}
            {adminLinks.map(({ title, url }) => (
              <Button
                color="inherit"
                key={title}
                onClick={() => {
                  router.push(url);
                }}
              >
                {title}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
