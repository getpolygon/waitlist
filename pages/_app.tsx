import theme from "../theme";
import Globals from "../theme/Globals";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Globals />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
