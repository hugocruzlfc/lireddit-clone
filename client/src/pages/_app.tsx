import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import { useMemo } from "react";
import { UrqlProvider, SSRExchange, Client } from "@urql/next";
import { withUrqlClient } from "../urql";

function MyApp({ Component, pageProps }: AppProps) {
  const [client, ssr] = useMemo(() => withUrqlClient(), []);

  return (
    <UrqlProvider
      client={client as Client}
      ssr={ssr as SSRExchange}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
