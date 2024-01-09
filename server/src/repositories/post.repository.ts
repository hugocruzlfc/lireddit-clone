import { Repository } from "typeorm";
import { Post } from "../entities";
import { AppDataSource } from "../typeorm.datasource";

export const postRepository: Repository<Post> =
  AppDataSource.getRepository(Post);
