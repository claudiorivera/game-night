import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2A9D8F",
    },
    secondary: {
      main: "#E9C46A",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
