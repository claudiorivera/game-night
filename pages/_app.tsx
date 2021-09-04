import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Container, CssBaseline } from "@mui/material";
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import { AlertDialog, MainAppBar } from "components";
import { AlertProvider } from "context/Alert";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "styles/theme";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Game Night</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <Provider session={pageProps.session}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <CssBaseline />
                <MainAppBar />
                <AlertDialog />
                <Container maxWidth="lg">
                  <Component {...pageProps} />
                </Container>
              </LocalizationProvider>
            </Provider>
          </AlertProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
