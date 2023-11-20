import { Post } from "../entities";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PostService } from "../services";

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.getPosts();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | null> {
    return this.postService.getPost(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post | null> {
    return this.postService.createPost(title);
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    return this.postService.updatePost(id, title);
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    return this.postService.deletePost(id);
  }
}
