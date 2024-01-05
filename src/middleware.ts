import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
	publicRoutes: ["/api/webhooks(.*)", "/api/cron-handler"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
