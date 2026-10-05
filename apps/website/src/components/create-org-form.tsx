"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function CreateOrgForm() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const slug = String(form.get("slug") ?? "")
      .toLowerCase()
      .trim();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/organizations`,
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, slug }),
    },
    );

    setLoading(false);

    if (!response.ok) {
      setError("Could not create organization");
      return;
    }

    event.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 w-full max-w-lg space-y-3">
      <label className="block space-y-1 text-sm">
        <span>{t("orgName")}</span>
        <input
          name="name"
          required
          minLength={2}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base outline-none ring-oak-fire focus:ring-2 sm:text-sm"
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span>{t("orgSlug")}</span>
        <input
          name="slug"
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          placeholder="my-newsroom"
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base outline-none ring-oak-fire focus:ring-2 sm:text-sm"
        />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-oak-fire px-4 py-3 text-sm font-semibold text-white hover:bg-oak-fire-dark disabled:opacity-60 sm:w-auto sm:py-2"
      >
        {t("createOrg")}
      </button>
    </form>
  );
}
