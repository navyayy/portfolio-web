import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostMeta } from "@/types/blog";

export type { BlogPostMeta };

const blogsDirectory = path.join(process.cwd(), "data/blogs");

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      date: data.date || "",
      author: data.author || { name: "Navya Srivastav", picture: "" },
      ogImage: data.ogImage,
    } as BlogPostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPostFull | null {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    date: data.date || "",
    author: data.author || { name: "Navya Srivastav", picture: "" },
    ogImage: data.ogImage,
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(blogsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
