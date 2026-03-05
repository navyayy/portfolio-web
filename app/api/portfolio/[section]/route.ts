import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyRequest } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/portfolio.json");

const VALID_SECTIONS = [
  "meta", "hero", "about", "metrics", "experience", "caseStudies",
  "skills", "instagramReels", "blog", "achievements", "education",
  "contact", "footer", "bookCall", "navLinks",
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  return NextResponse.json(data[section]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await request.json();
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  data[section] = body;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");

  return NextResponse.json({ success: true });
}
