import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// generateStaticParams removed: Next.js 15.5.x concurrent prerender-manifest
// read-modify-write in dev causes "Unexpected end of JSON input" 500s
// (github.com/vercel/next.js/issues/96259). Locales still resolve via middleware.

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // #region agent log
  {
    let raw = "";
    let parseOk = false;
    let parseErr = "";
    try {
      raw = readFileSync(join(process.cwd(), ".next", "prerender-manifest.json"), "utf8");
      JSON.parse(raw);
      parseOk = true;
    } catch (e) {
      parseErr = e instanceof Error ? e.message : String(e);
    }
    fetch("http://127.0.0.1:7415/ingest/b5dad717-ab9c-46ad-baa9-2c8fe37eddcb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "131056",
      },
      body: JSON.stringify({
        sessionId: "131056",
        runId: "post-fix",
        hypothesisId: "A",
        location: "layout.tsx:LocaleLayout",
        message: "LocaleLayout + prerender-manifest check",
        data: {
          locale,
          len: raw.length,
          parseOk,
          parseErr,
          hasGenerateStaticParams: false,
          preview: raw.slice(0, 80),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }
  // #endregion

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ku" || locale === "ar";

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <div className="page-shell" lang={locale}>
          {/* Header chrome stays LTR so language/auth controls never flip sides */}
          <SiteHeader locale={locale} />
          <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "rtl" : ""}>
            <main>{children}</main>
            <SiteFooter />
          </div>
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
