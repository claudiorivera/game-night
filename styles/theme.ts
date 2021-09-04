import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { primaryColor, secondaryColor } from "config";

const theme = createTheme(adaptV4Theme({
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
}));

export default theme;
