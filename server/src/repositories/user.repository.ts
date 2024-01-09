import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../typeorm.datasource";

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
