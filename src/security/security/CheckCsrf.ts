import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function CheckCSRF(req: NextRequest) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return null;

  const csrfTokenHeader = req.headers.get("x-csrf-token");
  const csrfTokenCookie = (await cookies()).get("csrf-token")?.value;

  if (!csrfTokenHeader || csrfTokenHeader !== csrfTokenCookie) {
    return new NextResponse(JSON.stringify({ error: "CSRF token inválido!" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return null;
}
