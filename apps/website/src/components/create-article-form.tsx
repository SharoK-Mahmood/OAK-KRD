"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "@/i18n/navigation";

type Org = { id: string; name: string };

type Props = {
  organizations: Org[];
};

export function CreateArticleForm({ organizations }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") ?? ""),
      slug: String(form.get("slug") ?? ""),
      type: "ARTICLE",
      locale: String(form.get("locale") ?? "ku"),
      body: String(form.get("body") ?? ""),
      summary: String(form.get("summary") ?? "") || undefined,
      organizationId: String(form.get("organizationId") ?? "") || undefined,
      publish: form.get("publish") === "on",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/contents`,
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
    );

    setLoading(false);

    if (!response.ok) {
      setError("Could not create article");
      return;
    }

    event.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 w-full max-w-2xl space-y-3">
      <h2 className="font-display text-lg font-semibold sm:text-xl">Publish article</h2>

      {organizations.length > 0 ? (
        <label className="block space-y-1 text-sm">
          <span>Organization</span>
          <select
            name="organizationId"
            className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
          >
            <option value="">Personal</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="block space-y-1 text-sm">
        <span>Title</span>
        <input
          name="title"
          required
          minLength={3}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span>Slug (optional)</span>
        <input
          name="slug"
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span>Locale</span>
        <select
          name="locale"
          defaultValue="ku"
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
        >
          <option value="ku">Kurdish</option>
          <option value="ar">Arabic</option>
          <option value="en">English</option>
        </select>
      </label>

      <label className="block space-y-1 text-sm">
        <span>Summary</span>
        <textarea
          name="summary"
          rows={2}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span>Body</span>
        <textarea
          name="body"
          required
          rows={8}
          className="w-full border border-oak-clay/50 bg-white/70 px-3 py-2.5 text-base sm:text-sm"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input name="publish" type="checkbox" defaultChecked className="size-4" />
        <span>Publish immediately</span>
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-oak-fire px-4 py-3 text-sm font-semibold text-white hover:bg-oak-fire-dark disabled:opacity-60 sm:w-auto sm:py-2"
      >
        Save article
      </button>
    </form>
  );
}
