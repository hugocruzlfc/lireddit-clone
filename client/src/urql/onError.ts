import { mapExchange } from "@urql/core";
//import { redirect } from "next/navigation";

const NOT_AUTHENTICATED = "not authenticated";

export const mapExchangeOnError = mapExchange({
  onError(error) {
    if (error?.message.includes(NOT_AUTHENTICATED)) {
      // redirect("/login"); // problemas en la version a
      window.location.replace("/login");
    } else {
      window.location.replace("/");
      //redirect("/");
    }
  },
});
