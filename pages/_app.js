import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import AlertDialog from "../components/app/AlertDialog";
import { EventsProvider } from "../components/events/context";
import { GamesProvider } from "../components/games/context";
import MainAppBar from "../components/app/MainAppBar";
import { UserProvider } from "../components/user/context";
import { AppProvider } from "../components/app/context";
import theme from "../styles/theme";

const App = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Game Night</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <UserProvider>
            <GamesProvider>
              <EventsProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <CssBaseline />
                  <MainAppBar />
                  <AlertDialog />
                  <Component {...pageProps} />
                </MuiPickersUtilsProvider>
              </EventsProvider>
            </GamesProvider>
          </UserProvider>
        </AppProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
