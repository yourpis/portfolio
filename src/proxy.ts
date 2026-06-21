import { withAuth } from "next-auth/middleware";

// This locks down every single page inside the /admin folder
export default withAuth({
  pages: {
    signIn: "/admin/login", // Redirect unauthorized users here
  },
});

export const config = {
  // Apply this lock specifically to the admin folder (except the login page)
  matcher: ["/admin/dashboard/:path*", "/admin/editor/:path*"],
};