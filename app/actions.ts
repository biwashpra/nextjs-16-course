"use server";

import { blogPostSchema, IBlogPost } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export async function createBlogAction(data: IBlogPost) {
  try {
    const parsedData = blogPostSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token },
    );

    const uploadedResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsedData.data.image.type,
      },
      body: parsedData.data.image,
    });

    if (!uploadedResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadedResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        title: parsedData.data.title,
        content: parsedData.data.content,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch {
    return {
      error: "Failed to create blog",
    };
  }

  return redirect("/blog");
}
