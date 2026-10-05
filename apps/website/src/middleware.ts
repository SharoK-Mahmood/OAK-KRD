import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // #region agent log
  fetch("http://127.0.0.1:7415/ingest/b5dad717-ab9c-46ad-baa9-2c8fe37eddcb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "131056",
    },
      body: JSON.stringify({
        sessionId: "131056",
        runId: "post-fix",
        hypothesisId: "E",
        location: "middleware.ts",
        message: "middleware hit",
        data: { path: request.nextUrl.pathname },
        timestamp: Date.now(),
      }),
  }).catch(() => {});
  // #endregion

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ku|ar|en)/:path*"],
};
