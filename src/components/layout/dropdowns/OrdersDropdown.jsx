import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrdersDropdown() {
  const { t } = useTranslation();

  return (
    <div className="group relative flex cursor-pointer items-center hover:text-[#eb5b00]">
      <Link to="/orders">
        <ClipboardList className="h-[22px] w-[22px]" strokeWidth={1.5} />
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 top-full hidden pt-4 group-hover:block z-50 w-64">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-2xl cursor-default text-gray-900 text-start">
          <h4 className="font-bold mb-3">{t("navbar.orders") || "Orders"}</h4>
          <ul className="text-sm flex flex-col gap-2 text-gray-600">
            <li className="hover:text-[#eb5b00] cursor-pointer">
              Secure payments
            </li>
            <li className="hover:text-[#eb5b00] cursor-pointer">
              Money-back guarantee
            </li>
            <li className="hover:text-[#eb5b00] cursor-pointer">
              Guaranteed on-time delivery
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
