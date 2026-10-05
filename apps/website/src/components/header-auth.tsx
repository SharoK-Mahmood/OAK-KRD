"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SignOutButton } from "./sign-out-button";

export function HeaderAuth() {
  const { data: session, status } = useSession();
  const t = useTranslations("nav");

  // Show signed-out UI immediately — never block the bar on session loading.
  const signedIn = status === "authenticated" && !!session?.user;

  return (
    <div className="flex h-8 min-w-0 items-center justify-end gap-2 whitespace-nowrap sm:gap-3">
      {signedIn ? (
        <>
          <Link
            href="/dashboard"
            className="max-w-[5.5rem] truncate text-[11px] hover:text-white sm:max-w-none sm:text-xs"
          >
            {t("dashboard")}
          </Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="hidden text-[11px] hover:text-white min-[380px]:inline sm:text-xs"
          >
            {t("signIn")}
          </Link>
          <Link
            href="/sign-up"
            className="bg-oak-fire px-2.5 py-1.5 text-[11px] font-semibold leading-none text-white transition hover:bg-oak-fire-dark sm:px-3 sm:text-xs"
          >
            {t("signUp")}
          </Link>
        </>
      )}
    </div>
  );
}
