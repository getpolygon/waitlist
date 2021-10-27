import { authentication } from "../utils/firebase";
import { signInAnonymously } from "@firebase/auth";
import { Html, Head, Main, NextScript } from "next/document";

signInAnonymously(authentication).catch((error) => console.error(error));

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
          rel="stylesheet"
        />

        <meta name={"title"} content={"Polygon — Coming Soon"} />
        <meta
          name={"description"}
          content={
            "A new, modern, and private social network that is not hungry for your data"
          }
        />

        <meta property={"og:type"} content={"website"} />
        <meta property={"og:url"} content={"https://polygon.am/"} />
        <meta property={"og:title"} content={"Polygon — Coming Soon"} />
        <meta property={"og:image"} content={"https://polygon.am/banner.png"} />
        <meta
          property={"og:description"}
          content={
            "A new, modern, and private social network that is not hungry for your data"
          }
        />

        <meta property={"twitter:url"} content={"https://polygon.am/"} />
        <meta property={"twitter:card"} content={"summary_large_image"} />
        <meta property={"twitter:title"} content={"Polygon — Coming Soon"} />
        <meta
          property={"twitter:description"}
          content={
            "A new, modern, and private social network that is not hungry for your data"
          }
        />
        <meta
          property={"twitter:image"}
          content={"https://polygon.am/banner.png"}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
