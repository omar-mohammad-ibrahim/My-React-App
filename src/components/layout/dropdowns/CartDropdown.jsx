import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const { t } = useTranslation();

  return (
    <div className="group relative flex cursor-pointer items-center hover:text-[#eb5b00]">
      <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.5} />

      <div className="absolute left-1/2 -translate-x-1/2 top-full hidden pt-4 group-hover:block z-50 w-64">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-2xl cursor-default text-center text-gray-900">
          <p className="text-sm text-gray-500 mb-4">
            {t("navbar.emptyCart") || "Your cart is empty"}
          </p>
          <Link to="/cart">
            <button className="w-full border border-gray-300 text-gray-900 py-2 rounded-full font-bold hover:bg-gray-50 cursor-pointer transition-colors">
              {t("navbar.goToCart") || "Go to cart"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
