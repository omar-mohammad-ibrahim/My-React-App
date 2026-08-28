import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // تحميل ملفات JSON من مسار public/locales/
  .use(Backend)
  // اكتشاف لغة الزائر وحفظ اختياره في المتصفح
  .use(LanguageDetector)
  // ربط المحرك ببيئة React
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // اللغة الاحتياطية في حال تعذر العثور على ترجمة
    debug: false,      // تفعيل طباعة تقارير الترجمة في الكونسول أثناء التطوير
    
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage'], // حفظ اللغة المختارة في ذاكرة المتصفح
    },

    interpolation: {
      escapeValue: false, // React يحمي البيانات من ثغرات XSS تلقائياً
    },
    
    backend: {
      // المسار الافتراضي للوصول لملفات الترجمة
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;