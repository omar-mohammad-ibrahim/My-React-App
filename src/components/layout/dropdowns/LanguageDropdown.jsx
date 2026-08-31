import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    localStorage.setItem("appLanguage", lng);
  };

  const currentLang = i18n.language === "ar" ? "العربية-JOD" : "English-JOD";

  return (
    <div className="group relative flex cursor-pointer items-center gap-1.5 hover:text-[#eb5b00]">
      <Globe className="h-[22px] w-[22px]" strokeWidth={1.5} />
      <span className="text-sm font-medium">{currentLang}</span>

      <div className="absolute left-1/2 -translate-x-1/2 top-full hidden pt-4 group-hover:block z-50 w-64">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-2xl cursor-default text-gray-900">
          <h4 className="font-bold mb-4">
            {t("navbar.setLanguage") || "Set language"}
          </h4>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => changeLanguage("en")}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${i18n.language === "en" ? "bg-orange-50 text-[#eb5b00] font-bold" : "hover:bg-gray-50"}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("ar")}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${i18n.language === "ar" ? "bg-orange-50 text-[#eb5b00] font-bold" : "hover:bg-gray-50"}`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
