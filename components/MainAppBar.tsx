import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DesktopMenu, Link, MobileMenu } from "components";

export const MainAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        {isMobile && <MobileMenu />}
        {!isMobile && <DesktopMenu />}
      </Toolbar>
    </AppBar>
  );
};
