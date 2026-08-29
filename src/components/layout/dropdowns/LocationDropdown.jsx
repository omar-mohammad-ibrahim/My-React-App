import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LocationDropdown() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="group relative flex cursor-pointer flex-col items-start leading-none hover:text-[#eb5b00]">
      <span className="text-[11px] text-gray-500 mb-1">
        {t("navbar.deliverTo") || "Deliver to:"}
      </span>
      <div className="flex items-center gap-1 font-semibold text-gray-900 group-hover:text-[#eb5b00]">
        <span className="text-base leading-none">🇯🇴</span>
        <span className="text-sm">JO</span>
      </div>

      <div className="absolute ltr:-left-4 rtl:-right-4 top-full hidden pt-3 group-hover:block z-50 w-72">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-2xl cursor-default text-gray-900 text-start">
          <h4 className="font-bold mb-2">
            {t("navbar.specifyLocation") || "Specify your location"}
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Shipping options and fees vary based on your location
          </p>
          {!isAuthenticated && (
            <Link to="/auth">
              <button className="w-full bg-[#eb5b00] text-white py-2 rounded-full font-bold mb-3 hover:bg-[#d45100] cursor-pointer">
                {t("navbar.signInAddress") || "Sign in to add address"}
              </button>
            </Link>
          )}
          <div className="h-[1px] w-full bg-gray-100 mb-3"></div>
          <div className="text-sm font-medium">Jordan</div>
        </div>
      </div>
    </div>
  );
}
