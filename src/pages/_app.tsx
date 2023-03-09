import { CacheProvider, EmotionCache } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { MainAppBar, Snackbar } from "~/components";
import { SnackbarProvider } from "~/context/Snackbar";
import { api } from "~/lib/api";
import { createEmotionCache } from "~/lib/createEmotionCache";
import theme from "~/styles/theme";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Game Night</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SessionProvider session={pageProps.session}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider>
                <CssBaseline enableColorScheme />
                <MainAppBar />
                <Snackbar />
                <Container maxWidth="lg">
                  <Component {...pageProps} />
                </Container>
              </SnackbarProvider>
            </LocalizationProvider>
          </SessionProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default api.withTRPC(MyApp);
