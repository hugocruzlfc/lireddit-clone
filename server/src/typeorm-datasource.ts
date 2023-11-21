import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "lireddit",
  entities: ["src/entities/**/*{.ts,.js}"],
  synchronize: true,
  logging: false,
} as DataSourceOptions;

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
