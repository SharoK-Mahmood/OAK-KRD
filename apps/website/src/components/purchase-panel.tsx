type Props = {
  title: string;
  priceCents: number;
  currency?: string;
  locale: string;
  details?: { label: string; value: string }[];
};

function formatPrice(cents: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale === "ku" ? "en-US" : locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

const copy = {
  ku: {
    buy: "کڕین",
    price: "نرخ",
    formats: "فۆرماتەکان",
    note: "کڕینی نموونەیی — پارەدان هێشتا چالاک نەکراوە.",
  },
  ar: {
    buy: "شراء",
    price: "السعر",
    formats: "الصيغ",
    note: "شراء تجريبي — الدفع غير مفعّل بعد.",
  },
  en: {
    buy: "Buy now",
    price: "Price",
    formats: "Formats",
    note: "Demo purchase — checkout is not live yet.",
  },
} as const;

export function PurchasePanel({
  title,
  priceCents,
  currency = "USD",
  locale,
  details = [],
}: Props) {
  const t = copy[locale as keyof typeof copy] ?? copy.en;
  const price = formatPrice(priceCents, currency, locale);

  return (
    <aside className="border border-oak-rule bg-oak-paper px-5 py-5 sm:px-6">
      <p className="kicker">{t.price}</p>
      <p className="mt-2 font-display text-3xl font-medium text-oak-ink">
        {price}
      </p>
      <p className="mt-1 text-sm text-oak-stone">{title}</p>

      {details.length > 0 ? (
        <dl className="mt-5 space-y-2 border-t border-oak-rule pt-4 text-sm">
          {details.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <dt className="text-oak-stone">{row.label}</dt>
              <dd className="font-medium text-oak-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <button
        type="button"
        className="mt-5 w-full bg-oak-fire px-4 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-oak-fire-dark"
      >
        {t.buy}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-oak-stone">{t.note}</p>
    </aside>
  );
}
