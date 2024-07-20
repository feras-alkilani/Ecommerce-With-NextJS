import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/product-details/(.*)"]
});

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
