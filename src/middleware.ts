import { NextResponse } from "next/server";

export function middleware() {
  const resp = NextResponse.next();
  resp.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  resp.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return resp;
}

export const config = {
  matcher: "/(.*)",
};
