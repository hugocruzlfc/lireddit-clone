import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const configDBConnection: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "lireddit",
  entities: [path.join(__dirname, "./entities/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "./migrations/*{.ts,.js}")],
  synchronize: false,
  migrationsRun: true,
  logging: false,
};

export const AppDataSource: DataSource = new DataSource(configDBConnection);
