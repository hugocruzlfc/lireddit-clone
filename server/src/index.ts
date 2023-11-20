import "reflect-metadata";
import express from "express";
import RedisStore from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";
import { MyContext } from "./types";
import cors from "cors";
import AppDataSource from "./typeorm-datasource";

const main = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to database through TypeORM.");
    })
    .catch((error) => console.log(error));
  const app = express();

  // Initialize client.
  let redis = new Redis();

  // Initialize store.
  let redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  // Initialize sesssion storage.
  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
