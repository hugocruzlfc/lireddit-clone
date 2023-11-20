import { DataSourceOptions } from "typeorm";
import { Post, User } from "./entities";

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "lireddit2",
  entities: [Post, User],
  synchronize: true,
  logging: true,
} as DataSourceOptions;
