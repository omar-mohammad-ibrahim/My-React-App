import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { t } = useTranslation();

  const {
    id,
    title = "Untitled Product",
    price = 0,
    image = "https://via.placeholder.com/300x300.png?text=No+Image",
    moq = 50,
    sold = 100,
  } = product || {};

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#eb5b00] hover:shadow-lg cursor-pointer"
    >
      <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="mb-2 text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#eb5b00]">
          {title}
        </h3>

        <div className="mb-1 flex items-baseline gap-1">
          <span className="text-xs font-semibold text-gray-500">
            {t("products.currency")}
          </span>
          <span className="text-lg font-bold text-gray-900">{price}</span>
        </div>

        <div className="mb-3 text-xs text-gray-500 flex items-center justify-between">
          <span>{t("products.moq", { count: moq })}</span>
          <span>{t("products.sold", { count: sold })}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-start text-xs">
          <div className="flex items-center gap-1 text-[#eb5b00] font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>{t("products.verified")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
