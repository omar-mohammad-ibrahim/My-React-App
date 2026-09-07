import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  return (
    <select
      value={i18n.language || "en"}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="px-3 py-1.5 bg-white border border-gray-300 rounded-brand text-xs font-medium text-gray-800 outline-hidden cursor-pointer hover:border-gray-500 transition-colors"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
