import { DataSource, DataSourceOptions } from "typeorm";
import { Post, User } from "./entities";

const dataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "lireddit",
  entities: [Post, User],
  synchronize: true,
  logging: true,
} as DataSourceOptions;

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
