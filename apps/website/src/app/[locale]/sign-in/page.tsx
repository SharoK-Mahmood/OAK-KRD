import { setRequestLocale } from "next-intl/server";
import { SignInForm } from "@/components/sign-in-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="oak-container max-w-md py-8 sm:py-12">
      <SignInForm />
    </section>
  );
}
