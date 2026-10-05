import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS } from "@oak-krd/shared";
import { LocaleSwitcher } from "./locale-switcher";
import { ContentNav } from "./content-nav";
import { HeaderAuth } from "./header-auth";

type Props = {
  locale: string;
};

export async function SiteHeader({ locale }: Props) {
  const t = await getTranslations("nav");
  const brand = await getTranslations("brand");
  const sections = await getTranslations("sections");

  const tabs = NAV_SECTIONS.map((slug) => ({
    slug,
    label: sections(`${slug}.nav`),
  }));

  const todayShort = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const todayLong = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header dir="ltr" className="border-b border-oak-rule bg-oak-bone">
      <div className="border-b border-oak-rule bg-oak-ink text-oak-bone">
        <div className="oak-container flex h-11 items-center justify-between gap-2 sm:h-10 sm:gap-3">
          <p className="min-w-0 truncate text-[11px] text-oak-bone/70 sm:hidden">
            {todayShort}
          </p>
          <p className="hidden min-w-0 truncate text-xs text-oak-bone/70 sm:block">
            {todayLong}
          </p>
          <div className="flex h-8 shrink-0 items-center gap-2 sm:gap-4">
            <LocaleSwitcher current={locale} />
            <HeaderAuth />
          </div>
        </div>
      </div>

      <div className="oak-container py-4 text-center sm:py-6 md:py-7">
        <Link href="/" className="group inline-block max-w-full px-1">
          <span className="font-brand text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-none tracking-tight text-oak-ink transition group-hover:text-oak-fire">
            {brand("name")}
          </span>
          <span className="mt-2 block max-w-[22rem] text-[10px] font-medium uppercase leading-snug tracking-[0.18em] text-oak-stone sm:mx-auto sm:max-w-none sm:text-xs sm:tracking-[0.22em]">
            {brand("tagline")}
          </span>
        </Link>
      </div>

      <ContentNav tabs={tabs} homeLabel={t("home")} />
    </header>
  );
}
