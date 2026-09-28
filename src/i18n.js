import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// 1. دالة مساعدة لضبط اتجاه ولغة الصفحة في وسم html
const updateHtmlDirection = (lang) => {
  const currentLang = lang || "en";
  const isArabic = currentLang.startsWith("ar");
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.documentElement.lang = currentLang;
};

// 2. تطبيق الاتجاه فوراً أثناء تحميل الملف لمنع ارتداد التصميم (Flash of LTR) عند الـ Refresh
const initialSavedLang =
  localStorage.getItem("appLanguage") ||
  localStorage.getItem("i18nextLng") ||
  "en";
updateHtmlDirection(initialSavedLang);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "cookie", "navigator"],
      // توحيد اسم المفتاح في التخزين مع المكونات (appLanguage)
      lookupLocalStorage: "appLanguage",
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

// 3. الاستماع لأي تغيير لغة يحدث لاحقاً وتحديث الاتجاه تلقائياً
i18n.on("languageChanged", (lng) => {
  updateHtmlDirection(lng);
});

export default i18n;
