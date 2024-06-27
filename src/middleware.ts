import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const PUBLIC_ROUTES = ["/auth/signin"];

export function middleware(request: NextRequest) {
  console.log("Request URL:", request.url);

  // Use next-cookies to get all cookies
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log("All cookies:", allCookies);

  // Get the token cookie
  const tokenCookie = cookieStore.get("token");
  console.log("Token cookie:", tokenCookie);

  if (!tokenCookie && !PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    console.log("No token cookie found, redirecting to signin");
    const signinUrl = new URL("/auth/signin", request.url);

    signinUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signinUrl);
  }

  console.log("Proceeding with request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
