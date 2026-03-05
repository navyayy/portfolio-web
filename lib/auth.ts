import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "crypto";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");

export async function signToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string };
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function verifyRequest(request: { cookies: { get: (name: string) => { value: string } | undefined } }): Promise<boolean> {
  const token = request.cookies.get("admin-token")?.value;
  if (!token) return false;
  return (await verifyToken(token)) !== null;
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) return false;
  if (!safeEqual(email, adminEmail)) return false;

  return safeEqual(password, adminPassword);
}
