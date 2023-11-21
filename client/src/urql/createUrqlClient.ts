import { persistedExchange } from "@urql/exchange-persisted";
import { ssrExchange, fetchExchange, createClient } from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "../utils";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

export function withUrqlClient() {
  const ssr = ssrExchange();
  const createUrqlClient = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      // this is for cookies
      credentials: "include",
    },
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      persistedExchange({
        preferGetForPersistedQueries: true,
      }),
      ssr,
      fetchExchange,
    ],
  });

  return [createUrqlClient, ssr];
}
