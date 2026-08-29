import React from "react";
import { MessageSquareText } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MessagesDropdown() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="group relative flex cursor-pointer items-center hover:text-[#eb5b00]">
      <Link to="/messages">
        <MessageSquareText className="h-[22px] w-[22px]" strokeWidth={1.5} />
      </Link>

      <div className="absolute ltr:-right-4 rtl:-left-4 top-full hidden pt-4 group-hover:block z-50 w-60">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-2xl cursor-default text-center text-gray-900">
          <h4 className="font-bold mb-1">
            {t("navbar.messages") || "Messages"}
          </h4>
          <p className="text-xs text-gray-500 mb-4">Sign in to view more</p>
          {!isAuthenticated && (
            <Link to="/auth">
              <button className="w-full bg-[#eb5b00] text-white py-2 rounded-full font-bold hover:bg-[#d45100] cursor-pointer">
                {t("navbar.signIn") || "Sign in"}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
