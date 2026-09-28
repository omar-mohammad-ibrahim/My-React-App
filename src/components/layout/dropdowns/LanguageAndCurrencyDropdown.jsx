import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/Button";

export default function LanguageAndCurrencyDropdown() {
  const { t, i18n } = useTranslation();

  // إدارة حالة فتح/إغلاق الـ Popover
  const [isOpen, setIsOpen] = useState(false);

  // إدارة القيم المحددة محلياً قبل الحفظ
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");
  const [selectedCurrency, setSelectedCurrency] = useState("JOD");

  // مزامنة اللغة والعملة الحالية من التخزين المحلي
  useEffect(() => {
    const savedLang =
      localStorage.getItem("appLanguage") || i18n.language || "en";
    const savedCurrency = localStorage.getItem("appCurrency") || "JOD";
    setSelectedLang(savedLang);
    setSelectedCurrency(savedCurrency);
  }, [i18n.language]);

  // عند الضغط على زر Save
  const handleSave = () => {
    // 1. تطبيق اللغة
    i18n.changeLanguage(selectedLang);
    document.documentElement.dir = selectedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectedLang;
    localStorage.setItem("appLanguage", selectedLang);

    // 2. تطبيق العملة
    localStorage.setItem("appCurrency", selectedCurrency);

    // 3. إغلاق النافذة المنبثقة
    setIsOpen(false);
  };

  // تسمية العرض في شريط التنقل العلوي
  const displayLabel = `${selectedLang === "ar" ? "العربية" : "English"}-${selectedCurrency}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* عنصر التفعيل (Trigger) */}
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
        >
          <Globe className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm font-medium">{displayLabel}</span>
        </button>
      </PopoverTrigger>

      {/* محتوى النافذة المنبثقة المتطابق مع صور التصميم */}
      <PopoverContent
        align="center"
        sideOffset={10}
        className="w-[330px] rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col gap-4">
          {/* العنوان والنص التوضيحي */}
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              {t("navbar.setLanguageAndCurrency") ||
                "Set language and currency"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t("navbar.selectPreferred") ||
                "Select your preferred language and currency. You can update the settings at any time."}
            </p>
          </div>

          {/* قائمة اختيار اللغة (Select) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              {t("navbar.language") || "Language"}
            </label>
            <Select value={selectedLang} onValueChange={setSelectedLang}>
              <SelectTrigger className="w-full h-10 rounded-lg border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover text-popover-foreground max-h-56">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="zh">简体中文</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* قائمة اختيار العملة (Select) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              {t("navbar.currency") || "Currency"}
            </label>
            <Select
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            >
              <SelectTrigger className="w-full h-10 rounded-lg border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover text-popover-foreground max-h-56">
                <SelectItem value="JOD">JOD - Jordanian Dinar</SelectItem>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="TRY">TRY - Turkish Lira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* زر الحفظ الأساسي بلون البراند البرتقالي الموحد */}
          <Button
            onClick={handleSave}
            className="w-full h-10 mt-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          >
            {t("common.save") || "Save"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
