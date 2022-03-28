import { Menu as MenuIcon } from "@mui/icons-material";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { adminLinks, userLinks } from "config";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const MobileMenu = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  // https://material-ui.com/components/app-bar/#app-bar-with-menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <IconButton
        sx={{ marginLeft: "auto" }}
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={(e) => {
          handleMenuOpen(e);
        }}
        size="large"
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
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        {!session && (
          <MenuItem
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Sign In
          </MenuItem>
        )}
        {!!session &&
          !!userLinks.length &&
          userLinks
            .map(({ url, title }) => (
              <MenuItem
                key={title}
                onClick={() => {
                  handleMenuClose();
                  router.push(url);
                }}
              >
                {title}
              </MenuItem>
            ))
            .concat(
              <MenuItem
                key="sign-out"
                onClick={() => {
                  handleMenuClose();
                  signOut();
                }}
              >
                Sign Out
              </MenuItem>
            )}

        {/* TODO: Create and protect admin routes */}
        {!!adminLinks.length &&
          adminLinks.map(({ title, url }) => (
            <MenuItem
              key={title}
              onClick={() => {
                handleMenuClose();
                router.push(url);
              }}
            >
              {title}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
