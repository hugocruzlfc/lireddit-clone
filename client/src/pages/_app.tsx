"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import { useMemo } from "react";
import { UrqlProvider, SSRExchange, Client } from "@urql/next";
import { withUrqlClient } from "../urql";
import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  const [client, ssr] = useMemo(() => withUrqlClient(), []);

  return (
    <UrqlProvider
      client={client as Client}
      ssr={ssr as SSRExchange}
    >
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
