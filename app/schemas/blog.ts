import z from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(10),
  image: z.instanceof(File),
});

export type IBlogPost = z.infer<typeof blogPostSchema>;
