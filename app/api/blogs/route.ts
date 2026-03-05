import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { verifyRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

const blogsDir = path.join(process.cwd(), "data/blogs");

export async function GET() {
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(blogsDir, filename), "utf8");
    const { data } = matter(content);

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      date: data.date || "",
      author: data.author || { name: "Navya Srivastav", picture: "" },
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(posts, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, excerpt, coverImage, date, author, ogImage, content } = body;

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const filePath = path.join(blogsDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: "A blog post with this slug already exists" }, { status: 409 });
  }

  const frontmatter: Record<string, unknown> = {
    title,
    excerpt: excerpt || "",
    coverImage: coverImage || `/assets/blog/${slug}/cover.jpg`,
    date: date || new Date().toISOString(),
    author: author || { name: "Navya Srivastav", picture: "/assets/blog/authors/navyayy.png" },
  };

  if (ogImage) {
    frontmatter.ogImage = ogImage;
  }

  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(filePath, fileContent);

  return NextResponse.json({ success: true, slug }, { status: 201 });
}
