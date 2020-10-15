import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import React, { Fragment } from "react";

const MobileMenu = ({
  session,
  router,
  userLinks,
  adminLinks,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  isMobileMenuOpen,
}) => {
  return (
    <Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
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
        {session?.user.id && (
          <Fragment>
            {userLinks.map(({ url, title }, index) => (
              <MenuItem
                key={index}
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
          </Fragment>
        )}
        {/* TODO: Protect admin link routes */}
        {adminLinks.map(({ title, url }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuClose();
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
              router.push("/api/auth/signin");
            }}
          >
            Login/Register
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default MobileMenu;
