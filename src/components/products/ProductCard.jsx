import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { t } = useTranslation();

  const {
    id,
    title = "Untitled Product",
    price = 0,
    image = "https://placehold.co/300x300?text=No+Image",
    moq = 1,
    sold = 0,
  } = product || {};

  const numericPrice = Number(price) || 0;

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md cursor-pointer"
    >
      {/* حاوية الصورة */}
      <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-muted/40 border border-border/40">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* تفاصيل البطاقة */}
      <div className="flex flex-col grow">
        <h3 className="mb-2 text-sm font-medium text-card-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {title}
        </h3>

        <div className="mb-1 flex items-baseline gap-1">
          <span className="text-xs font-semibold text-muted-foreground">
            {t("products.currency")}
          </span>
          <span className="text-lg font-bold text-foreground">
            {numericPrice.toFixed(2)}
          </span>
        </div>

        <div className="mb-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>{t("products.moq", { count: moq })}</span>
          <span>{t("products.sold", { count: sold })}</span>
        </div>

        {/* الشريط السفلي والتوثيق */}
        <div className="mt-auto pt-2 border-t border-border flex items-center justify-start text-xs">
          <div className="flex items-center gap-1 text-primary font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>{t("products.verified")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
