import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // #region agent log
  let messagesOk = false;
  let messagesErr = "";
  let messagesKeys = 0;
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    messagesOk = !!messages && typeof messages === "object";
    messagesKeys = messages ? Object.keys(messages).length : 0;
    fetch("http://127.0.0.1:7415/ingest/b5dad717-ab9c-46ad-baa9-2c8fe37eddcb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "131056",
      },
      body: JSON.stringify({
        sessionId: "131056",
        runId: "post-fix",
        hypothesisId: "D",
        location: "i18n/request.ts",
        message: "messages load attempt",
        data: { requested, locale, messagesOk, messagesKeys, messagesErr },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    return { locale, messages };
  } catch (e) {
    messagesErr = e instanceof Error ? e.message : String(e);
    fetch("http://127.0.0.1:7415/ingest/b5dad717-ab9c-46ad-baa9-2c8fe37eddcb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "131056",
      },
      body: JSON.stringify({
        sessionId: "131056",
        runId: "post-fix",
        hypothesisId: "D",
        location: "i18n/request.ts",
        message: "messages load FAILED",
        data: { requested, locale, messagesOk, messagesKeys, messagesErr },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    throw e;
  }
  // #endregion
});
