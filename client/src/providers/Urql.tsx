"use client";
import React, { useMemo } from "react";
import { withUrqlClient } from "../urql";
import { UrqlProvider, SSRExchange, Client } from "@urql/next";

export interface UrqlProps {
  children: React.ReactNode;
}

export const Urql: React.FC<UrqlProps> = ({ children }) => {
  const [client, ssr] = useMemo(() => withUrqlClient(), []);

  return (
    <UrqlProvider
      client={client as Client}
      ssr={ssr as SSRExchange}
    >
      {children}
    </UrqlProvider>
  );
};
