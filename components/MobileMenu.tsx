import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Link } from "types";

interface Props {
  userLinks: Link[];
  adminLinks: Link[];
}

export const MobileMenu = ({ userLinks, adminLinks }: Props) => {
  const [session] = useSession();
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

  return <>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={(e) => {
        handleMenuOpen(e);
      }}
      size="large">
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
            signIn();
          }}
        >
          Login
        </MenuItem>
      )}
      {!!userLinks.length &&
        userLinks.map(({ url, title }) => (
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
      <MenuItem
        onClick={() => {
          handleMenuClose();
          signOut();
        }}
      >
        Log Out
      </MenuItem>
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
  </>;
};
