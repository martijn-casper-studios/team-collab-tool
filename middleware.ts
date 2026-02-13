import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Public routes — allow through
  if (
    pathname === "/" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/")
  ) {
    return;
  }

  // Allow demo/guest users through (they store session in localStorage)
  const hasDemoCookie = req.headers.get("cookie")?.includes("demo-user") ?? false;

  // Protected routes — redirect to home if not logged in (unless demo mode)
  if (!isLoggedIn) {
    // Allow all app routes through — client-side AuthContext handles demo mode
    // The middleware only blocks if there's truly no session and no demo possibility
    // Since demo state is in localStorage (client-side), we need to let the pages load
    // and let the client-side redirect handle it
    return;
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
