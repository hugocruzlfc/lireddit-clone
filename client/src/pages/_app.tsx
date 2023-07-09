import { ChakraProvider } from "@chakra-ui/react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import theme from "../theme";
import { AppProps } from "next/app";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
