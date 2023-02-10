import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DesktopMenu, Link, MobileMenu } from "components";

export const MainAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Link href="/" sx={{ mr: "auto" }}>
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
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </Toolbar>
    </AppBar>
  );
};
