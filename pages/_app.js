import MomentUtils from "@date-io/moment";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import AlertDialog from "../components/AlertDialog";
import { EventsProvider } from "../components/events/context";
import { GamesProvider } from "../components/games/context";
import MainAppBar from "../components/MainAppBar";
import { UserProvider } from "../components/user/context";
import { AppProvider } from "../context";
import "../styles/globals.css";

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

const App = ({ Component, pageProps }) => (
  <AppProvider>
    <UserProvider>
      <GamesProvider>
        <EventsProvider>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CssBaseline />
              <MainAppBar />
              <AlertDialog />
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </EventsProvider>
      </GamesProvider>
    </UserProvider>
  </AppProvider>
);

export default App;
