"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export function SignInForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("errorInvalid"));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">
      <h1 className="font-display text-3xl font-medium text-oak-ink">{t("signInTitle")}</h1>

      <label className="block space-y-1 text-sm">
        <span>{t("email")}</span>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base outline-none ring-oak-fire focus:ring-2 sm:text-sm"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span>{t("password")}</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base outline-none ring-oak-fire focus:ring-2 sm:text-sm"
        />
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-oak-fire px-4 py-3 text-sm font-semibold text-white hover:bg-oak-fire-dark disabled:opacity-60"
      >
        {t("signInSubmit")}
      </button>

      <p className="text-sm text-oak-stone">
        {t("noAccount")}{" "}
        <Link href="/sign-up" className="font-semibold text-oak-fire underline">
          {t("signUpSubmit")}
        </Link>
      </p>
    </form>
  );
}
