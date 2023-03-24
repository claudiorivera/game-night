import "../styles/globals.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AlertDialog, MainAppBar } from "components";
import { AlertProvider } from "context/Alert";
import { createEmotionCache } from "lib/createEmotionCache";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import theme from "styles/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
}
