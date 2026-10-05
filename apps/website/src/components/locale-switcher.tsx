"use client";

import { useCallback, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES } from "@oak-krd/shared";

type Props = {
  current: string;
};

const LOCALE_BUTTONS = [
  { code: "ku" as const, label: "KU" },
  { code: "ar" as const, label: "AR" },
  { code: "en" as const, label: "EN" },
];

export function LocaleSwitcher({ current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    for (const locale of LOCALES) {
      if (locale !== current) {
        router.prefetch(pathname, { locale });
      }
    }
  }, [current, pathname, router]);

  const switchLocale = useCallback(
    (locale: (typeof LOCALE_BUTTONS)[number]["code"]) => {
      if (locale === current || pending) return;
      startTransition(() => {
        router.replace(pathname, { locale });
      });
    },
    [current, pathname, pending, router, startTransition],
  );

  return (
    <div
      dir="ltr"
      className={`flex h-7 shrink-0 items-center gap-0.5 text-[10px] font-bold tracking-wider ${
        pending ? "pointer-events-none opacity-70" : ""
      }`}
    >
      {LOCALE_BUTTONS.map((locale) => {
        const active = current === locale.code;
        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => switchLocale(locale.code)}
            onMouseEnter={() => router.prefetch(pathname, { locale: locale.code })}
            className={`inline-flex h-6 min-w-[1.75rem] items-center justify-center px-1.5 transition ${
              active
                ? "bg-oak-fire text-white"
                : "text-oak-bone/75 hover:text-white"
            }`}
            aria-pressed={active}
          >
            {locale.label}
          </button>
        );
      })}
    </div>
  );
}
