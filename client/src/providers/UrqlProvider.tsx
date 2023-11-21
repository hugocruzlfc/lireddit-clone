"use client";
import React, { useMemo } from "react";
import { withUrqlClient } from "../urql";
import { UrqlProvider as Provider, SSRExchange, Client } from "@urql/next";

export interface UrqlProviderProps {
  children: React.ReactNode;
}

export const UrqlProvider: React.FC<UrqlProviderProps> = ({ children }) => {
  const [client, ssr] = useMemo(() => withUrqlClient(), []);

  return (
    <Provider
      client={client as Client}
      ssr={ssr as SSRExchange}
    >
      {children}
    </Provider>
  );
};
