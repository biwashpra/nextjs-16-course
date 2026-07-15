"use server";

import { blogPostSchema, IBlogPost } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export async function createBlogAction(data: IBlogPost) {
  const parsedData = blogPostSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Something went wrong");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsedData.data.title,
      content: parsedData.data.content,
    },
    { token },
  );

  return redirect("/");
}
