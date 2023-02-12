import { createTheme } from "@mui/material/styles";
import { Roboto } from "@next/font/google";
import { primaryColor, secondaryColor } from "config";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
