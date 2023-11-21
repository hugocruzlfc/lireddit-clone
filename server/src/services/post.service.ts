import { postRepository } from "../repositories";

export async function getPosts() {
  try {
    return await postRepository.find();
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

export async function createPost(title: string) {
  try {
    const post = postRepository.create({ title });
    await postRepository.save(post);
    return post;
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
