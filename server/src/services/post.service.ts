import { Post } from "../entities";
import { postRepository } from "../repositories";
import { PostInput } from "../dtos";

export async function getPosts(limit: number, cursor: string | null) {
  try {
    const realLimit = Math.min(50, limit);
    return postRepository
      .createQueryBuilder("post")
      .where(cursor ? '"createdAt" < :cursor' : "1 = 1", {
        cursor: new Date(parseInt(cursor as string)),
      })
      .orderBy('"createdAt"', "DESC")
      .take(realLimit)
      .getMany();
  } catch (error) {
    console.log(error);
    return []; // Return empty array in case of an error}
  }
}

export async function getPost(id: number) {
  try {
    return await postRepository.findOne({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
}

export async function createPost(postInput: PostInput, userId: number) {
  try {
    // const post = postRepository.create({ title });
    // await postRepository.save(post);

    //using query builder
    const post = await postRepository
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        ...postInput,
        creatorId: userId,
      })
      .returning("*")
      .execute();
    return post.raw[0] as Post;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePost(id: number, title: string) {
  try {
    const post = await postRepository.findOne({ where: { id } });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await postRepository.update({ id }, { title });
    }
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deletePost(id: number) {
  try {
    const post = await postRepository.findOne({ where: { id } });
    if (!post) {
      return false;
    }
    await postRepository.delete({ id });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
