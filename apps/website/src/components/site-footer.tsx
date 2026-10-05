import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS } from "@oak-krd/shared";

export async function SiteFooter() {
  const brand = await getTranslations("brand");
  const sections = await getTranslations("sections");
  const t = await getTranslations("footer");

  return (
    <footer className="mt-10 border-t-2 border-oak-ink bg-oak-bone sm:mt-16">
      <div className="oak-container grid gap-8 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-3">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <p className="font-brand text-2xl text-oak-ink sm:text-3xl">{brand("name")}</p>
          <p className="mt-2 max-w-sm text-sm text-oak-stone">{brand("tagline")}</p>
        </div>
        <div className="min-w-0">
          <p className="kicker">{t("sections")}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:block sm:space-y-1.5">
            {NAV_SECTIONS.map((slug) => (
              <li key={slug}>
                <Link href={`/browse/${slug}`} className="hover:text-oak-fire">
                  {sections(`${slug}.nav`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <p className="kicker">{t("about")}</p>
          <p className="mt-3 text-sm leading-relaxed text-oak-stone">{t("blurb")}</p>
        </div>
      </div>
      <div className="border-t border-oak-rule">
        <p className="oak-container py-4 text-xs text-oak-stone">
          © {new Date().getFullYear()} {brand("name")}
        </p>
      </div>
    </footer>
  );
}
