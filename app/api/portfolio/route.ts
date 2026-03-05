import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataPath = path.join(process.cwd(), "data/portfolio.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
