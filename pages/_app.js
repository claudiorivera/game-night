import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "next-auth/client";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import AlertDialog from "../components/AlertDialog";
import MainAppBar from "../components/MainAppBar";
import { AlertProvider } from "../context/Alert";
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
        <title>Game Night (Development Version)</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <Provider session={pageProps.session}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CssBaseline />
              <MainAppBar />
              <AlertDialog />
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </Provider>
        </AlertProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
