import React from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SubHeader() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 text-sm font-medium">
        <div className="flex items-center gap-6 text-gray-800">
          <div className="group relative flex cursor-pointer items-center gap-2 hover:text-[#eb5b00] py-1.5">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
            <span>{t("subheader.allCategories") || "All categories"}</span>

            <div className="absolute top-full ltr:left-0 rtl:right-0 hidden pt-3 group-hover:block z-50 w-[800px]">
              <div className="h-[400px] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl cursor-default text-black">
                <h1>محتوى الفئات (Categories) يوضع هنا...</h1>
              </div>
            </div>
          </div>

          <div className="group relative cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.verified") || "Verified manufacturers"}</span>

            <div className="absolute top-full ltr:left-0 rtl:right-0 hidden pt-3 group-hover:block z-50 w-[600px]">
              <div className="h-[300px] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl cursor-default text-black">
                <h1>محتوى المصنعين يوضع هنا...</h1>
              </div>
            </div>
          </div>

          <div className="cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.dropshipping") || "Dropshipping"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <div className="cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.about") || "About Alibaba.com"}</span>
          </div>

          <div className="group relative cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.help") || "Help Center"}</span>

            <div className="absolute top-full inset-e-0 hidden pt-3 group-hover:block z-50 w-[400px]">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl cursor-default text-black">
                <h1>محتوى مركز المساعدة يوضع هنا...</h1>
              </div>
            </div>
          </div>

          <div className="cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.accio") || "Accio Work"}</span>
          </div>
          <div className="cursor-pointer hover:text-[#eb5b00] py-1.5">
            <span>{t("subheader.sell") || "Sell on Alibaba.com"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
