import { Post } from "../entities";
import AppDataSource from "../typeorm-datasource";

export class PostService {
  private appDataSource;

  constructor() {
    this.appDataSource = AppDataSource.getRepository(Post);
  }

  async getPosts() {
    try {
      return await this.appDataSource.find();
    } catch (error) {
      console.log(error);
      return []; // Return empty array in case of an error}
    }
  }

  async getPost(id: number) {
    try {
      return await this.appDataSource.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return null; // Return null in case of an error
    }
  }

  async createPost(title: string) {
    try {
      const post = this.appDataSource.create({ title });
      await this.appDataSource.save(post);
      return post;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updatePost(id: number, title: string) {
    try {
      const post = await this.appDataSource.findOne({ where: { id } });
      if (!post) {
        return null;
      }
      if (typeof title !== "undefined") {
        post.title = title;
        await this.appDataSource.update({ id }, { title });
      }
      return post;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deletePost(id: number) {
    try {
      const post = await this.appDataSource.findOne({ where: { id } });
      if (!post) {
        return false;
      }
      await this.appDataSource.delete({ id });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
