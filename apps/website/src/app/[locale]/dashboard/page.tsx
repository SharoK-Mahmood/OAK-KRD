import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { prisma } from "@oak-krd/database";
import { getSession } from "@/lib/session";
import { CreateOrgForm } from "@/components/create-org-form";
import { CreateArticleForm } from "@/components/create-article-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session?.user) {
    redirect(`/${locale}/sign-in`);
  }

  const t = await getTranslations("dashboard");

  const memberships = await prisma.organizationMember.findMany({
    where: { userId: session.user.id },
    include: { organization: true },
    orderBy: { createdAt: "desc" },
  });

  const organizations = memberships.map((m) => m.organization);

  const contents = await prisma.content.findMany({
    where: { authorId: session.user.id },
    include: {
      variants: {
        select: { locale: true, format: true, status: true },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <section className="oak-container space-y-8 py-8 sm:space-y-10 sm:py-10">
      <div className="border-b border-oak-ink pb-4">
        <h1 className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium text-oak-ink">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-oak-stone sm:text-base">
          {t("welcome", { name: session.user.name ?? session.user.email ?? "publisher" })}
        </p>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold">{t("orgs")}</h2>
        {organizations.length === 0 ? (
          <p className="mt-2 text-sm text-oak-stone">{t("noOrgs")}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {organizations.map((org) => (
              <li key={org.id} className="rounded-md border border-oak-clay/30 bg-white/50 px-4 py-3">
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-oak-stone">/{org.slug}</p>
              </li>
            ))}
          </ul>
        )}
        <CreateOrgForm />
      </div>

      <div>
        <CreateArticleForm organizations={organizations.map((o) => ({ id: o.id, name: o.name }))} />
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold">{t("contents")}</h2>
        {contents.length === 0 ? (
          <p className="mt-2 text-sm text-oak-stone">{t("noContents")}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {contents.map((content) => (
              <li key={content.id} className="rounded-md border border-oak-clay/30 bg-white/50 px-4 py-3">
                <p className="font-medium">{content.title}</p>
                <p className="text-sm text-oak-stone">
                  {content.type} ·{" "}
                  {content.variants
                    .map((v) => `${v.locale}/${v.format}:${v.status}`)
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
