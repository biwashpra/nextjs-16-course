import z from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(10),
});

export type IBlogPost = z.infer<typeof blogPostSchema>;
