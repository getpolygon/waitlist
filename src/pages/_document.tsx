import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  public render() {
    return (
      <Html>
        <Head>
          <link type="text/css" rel="stylesheet" href="/fonts/styles.css" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}

