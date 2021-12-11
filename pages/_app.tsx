import theme from "../theme";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStyles } from "../theme/GlobalStyles";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
