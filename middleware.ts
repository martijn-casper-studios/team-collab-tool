import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Public routes — allow through
  if (
    pathname === "/" ||
    pathname.startsWith("/api/auth")
  ) {
    return;
  }

  // Protected routes — redirect to home if not logged in
  if (!isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
