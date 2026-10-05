"use client";

import { useEffect, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { NAV_SECTIONS, type NavSection } from "@oak-krd/shared";

type Tab = {
  slug: NavSection;
  label: string;
};

type Props = {
  tabs: Tab[];
  homeLabel: string;
};

export function ContentNav({ tabs, homeLabel }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isHome = pathname === "/";

  useEffect(() => {
    router.prefetch("/");
    for (const slug of NAV_SECTIONS) {
      router.prefetch(`/browse/${slug}`);
    }
  }, [router]);

  return (
    <div
      dir="ltr"
      className="sticky top-0 z-40 border-y border-oak-ink bg-oak-bone"
    >
      {pending ? (
        <div className="h-0.5 w-full overflow-hidden bg-oak-sand">
          <div className="h-full w-1/3 animate-pulse bg-oak-fire" />
        </div>
      ) : (
        <div className="h-0.5 w-full bg-transparent" />
      )}
      <nav
        aria-label="Content sections"
        className="nav-scroll nav-fade oak-container flex h-11 items-center gap-0 overflow-x-auto overscroll-x-contain sm:justify-center"
      >
        <Link
          href="/"
          prefetch
          onClick={(e) => {
            if (pathname === "/") return;
            e.preventDefault();
            startTransition(() => router.push("/"));
          }}
          className={`shrink-0 px-2.5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition sm:px-3.5 sm:text-[11px] sm:tracking-[0.16em] ${
            isHome ? "text-oak-fire" : "text-oak-ink hover:text-oak-fire"
          }`}
        >
          {homeLabel}
        </Link>
        {tabs.map((tab) => {
          const href = `/browse/${tab.slug}` as const;
          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={tab.slug}
              href={href}
              prefetch
              onClick={(e) => {
                if (active) return;
                e.preventDefault();
                startTransition(() => router.push(href));
              }}
              className={`shrink-0 px-2.5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition sm:px-3.5 sm:text-[11px] sm:tracking-[0.16em] ${
                active ? "text-oak-fire" : "text-oak-ink hover:text-oak-fire"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
