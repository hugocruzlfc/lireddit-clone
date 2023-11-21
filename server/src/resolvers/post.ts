import { Post } from "../entities";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../services";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return getPosts();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | null> {
    return getPost(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post | null> {
    return createPost(title);
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    return updatePost(id, title);
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    return deletePost(id);
  }
}
