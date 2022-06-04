import "~/styles/overrides.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { newCustomTheme } from "~/ui/mui-theme";

const App = ({ Component, pageProps }: AppProps) => {
  const theme = React.useMemo(() => newCustomTheme("light"), []);

  return (
    <React.Fragment>
      <React.StrictMode>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <NextSeo
          title={"Polygon Project"}
          openGraph={{
            type: "website",
            title: "Polygon Project",
            url: "https://polygon.am/",
            site_name: "Polygon Project",
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.StrictMode>
    </React.Fragment>
  );
};

export default App;

