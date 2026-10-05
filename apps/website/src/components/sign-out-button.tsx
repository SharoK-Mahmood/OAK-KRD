"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export function SignOutButton() {
  const t = useTranslations("nav");

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-[11px] hover:text-white sm:text-xs"
    >
      {t("signOut")}
    </button>
  );
}
