import { Post } from "../entities";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../services";
import { PostInput } from "../dtos";
import { MyContext } from "../types";
import { isAuth } from "../middlewares";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Post[]> {
    return getPosts(limit, cursor);
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | null> {
    return getPost(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    return createPost(input, req.session.userId!);
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
