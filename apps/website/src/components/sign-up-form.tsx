"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export function SignUpForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/auth/register`,
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    );

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setLoading(false);
      setError(data.error === "EMAIL_EXISTS" ? t("errorExists") : t("errorGeneric"));
      return;
    }

    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("errorGeneric"));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">
      <h1 className="font-display text-3xl font-medium text-oak-ink">{t("signUpTitle")}</h1>

      <label className="block space-y-1 text-sm">
        <span>{t("name")}</span>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base outline-none ring-oak-fire focus:ring-2 sm:text-sm"
        />
      </label>

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
        {t("signUpSubmit")}
      </button>

      <p className="text-sm text-oak-stone">
        {t("hasAccount")}{" "}
        <Link href="/sign-in" className="font-semibold text-oak-fire underline">
          {t("signInSubmit")}
        </Link>
      </p>
    </form>
  );
}
