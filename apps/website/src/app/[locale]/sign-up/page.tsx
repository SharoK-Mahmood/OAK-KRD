import { setRequestLocale } from "next-intl/server";
import { SignUpForm } from "@/components/sign-up-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="oak-container max-w-md py-8 sm:py-12">
      <SignUpForm />
    </section>
  );
}
