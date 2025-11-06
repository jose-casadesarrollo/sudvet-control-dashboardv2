import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createMiddlewareClient({ req, res });
  // This will refresh the session if needed and set the auth cookie
  await supabase.auth.getSession();

  const { data: { session } } = await supabase.auth.getSession();
  const url = req.nextUrl;

  // Redirect unauthenticated users from protected routes to /login
  const isProtected =
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/settings") ||
    url.pathname.startsWith("/app");
  if (!session && isProtected) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(redirectUrl);
  }

  // Prevent hitting /login when already authenticated
  if (session && url.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    // Run on all paths except public assets and next internals
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
