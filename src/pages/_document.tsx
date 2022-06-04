import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  public render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;800&amp;display=swap" />
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}

