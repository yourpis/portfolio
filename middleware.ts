import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Protect all routes under /admin, but next-auth will automatically allow /admin/login because it's set as the signIn page
  matcher: ["/admin/:path*"],
};
