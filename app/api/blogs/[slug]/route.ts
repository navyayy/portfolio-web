import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { verifyRequest } from "@/lib/auth";

const blogsDir = path.join(process.cwd(), "data/blogs");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(blogsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return NextResponse.json({
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    date: data.date || "",
    author: data.author || { name: "Navya Srivastav", picture: "" },
    ogImage: data.ogImage,
    content,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const filePath = path.join(blogsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  const body = await request.json();
  const { title, excerpt, coverImage, date, author, ogImage, content } = body;

  const frontmatter: Record<string, unknown> = {
    title,
    excerpt: excerpt || "",
    coverImage: coverImage || "",
    date: date || "",
    author: author || { name: "Navya Srivastav", picture: "" },
  };

  if (ogImage) {
    frontmatter.ogImage = ogImage;
  }

  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(filePath, fileContent);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const filePath = path.join(blogsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ success: true });
}
