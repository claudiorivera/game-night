import { primaryColor, secondaryColor } from "@config";
import { createTheme } from "@material-ui/core/styles";

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
});

export default theme;
