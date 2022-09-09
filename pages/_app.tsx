import { Container, CssBaseline } from "@mui/material";
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AlertDialog, MainAppBar } from "components";
import { AlertProvider } from "context/Alert";
import { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import theme from "styles/theme";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const App = (
  props: AppProps<{
    session: Session;
  }>
) => {
  const { Component, pageProps } = props;

  useEffect(() => {
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
            <SessionProvider session={pageProps.session}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <CssBaseline />
                <MainAppBar />
                <AlertDialog />
                <Container maxWidth="lg">
                  <Component {...pageProps} />
                </Container>
              </LocalizationProvider>
            </SessionProvider>
          </AlertProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
