import { mapExchange } from "@urql/core";
import Router from "next/router";

const NOT_AUTHENTICATED = "not authenticated";

export const mapExchangeOnError = mapExchange({
  onError(error) {
    if (error?.message.includes(NOT_AUTHENTICATED)) {
      Router.replace("/login");
    } else {
      Router.replace("/");
    }
  },
});
