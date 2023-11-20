import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import RedisStore from "connect-redis";
import session from "express-session";
// import { createClient } from "redis";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";
import { MyContext } from "./types";
import cors from "cors";
import { DataSource } from "typeorm";
import dataSourceOptions from "./typeorm-datasource";
//import { User } from "./entities/User";
//import { sendEmail } from "./utils/sendEmail";

//import { Post } from "./entities/Posts";

const main = async () => {
  const appDataSource = new DataSource(dataSourceOptions);
  //sendEmail("bob@gmail.com", "hello there");
  //const orm = await MikroORM.init(mikroConfig);
  //await orm.em.nativeDelete(User, {});
  //await orm.getMigrator().up();
  appDataSource
    .initialize()
    .then(() => {
      console.log("Connected to database through TypeORM.");
    })
    .catch((error) => console.log(error));
  const app = express();

  // Initialize client.
  let redis = new Redis();
  // let redisClient = createClient();
  //redisClient.connect().catch(console.error);

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
      resolvers: [HelloResolver, PostResolver, UserResolver],
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
  // const post = orm.em.create(Post, {
  //   title: "My first post",
  //   createAt: "",
  //   updateAt: "",
  // });
  // await orm.em.persistAndFlush(post);
  // await orm.em.insert({
  //   title: "My first post 2",
  //   createAt: "",
  //   updateAt: "",
  // });

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch((err) => {
  console.log(err);
});
