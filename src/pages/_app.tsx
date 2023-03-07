import { CacheProvider, EmotionCache } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { AlertDialog, MainAppBar } from "~/components";
import { AlertProvider } from "~/context/Alert";
import { api } from "~/lib/api";
import { createEmotionCache } from "~/lib/createEmotionCache";
import theme from "~/styles/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
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

export default api.withTRPC(MyApp);
