import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { api } from "~/lib/api";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
