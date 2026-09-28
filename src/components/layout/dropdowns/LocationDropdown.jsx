import React, { useState, useEffect } from "react";
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
import CountryFlag from "@/components/common/CountryFlag";

// قائمة الدول مع الرموز الدولية المتوافقة مع flagcdn
const COUNTRIES = [
  { code: "JO", name: "Jordan" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "EG", name: "Egypt" },
  { code: "DE", name: "Germany" },
  { code: "MX", name: "Mexico" },
  { code: "AU", name: "Australia" },
];

export default function LocationDropdown() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  // إدارة الدولة والرمز البريدي
  const [selectedCountry, setSelectedCountry] = useState("JO");
  const [postalCode, setPostalCode] = useState("11818");

  // استرجاع القيم المخزنة محلياً عند بدء التشغيل
  useEffect(() => {
    const savedCountry = localStorage.getItem("deliveryCountry") || "JO";
    const savedPostalCode = localStorage.getItem("deliveryPostalCode") || "";
    setSelectedCountry(savedCountry);
    setPostalCode(savedPostalCode);
  }, []);

  // حفظ التعديلات وإغلاق القائمة
  const handleSave = () => {
    localStorage.setItem("deliveryCountry", selectedCountry);
    localStorage.setItem("deliveryPostalCode", postalCode.trim());
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* الزر الظاهر في شريط التنقل العلوي (Navbar) */}
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-col items-start leading-tight text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1.5 py-0.5"
        >
          <span className="text-[11px] text-muted-foreground">
            {t("navbar.deliverTo") || "Deliver to:"}
          </span>
          <div className="flex items-center gap-1.5 font-bold text-xs mt-0.5">
            <CountryFlag
              code={selectedCountry}
              className="w-6 h-4 shrink-0  "
            />
            <span>
              {postalCode
                ? `${postalCode}, ${selectedCountry}`
                : selectedCountry}
            </span>
          </div>
        </button>
      </PopoverTrigger>

      {/* النافذة المنبثقة (Popover) */}
      <PopoverContent
        align="center"
        sideOffset={10}
        className="w-82.5 rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col gap-4">
          {/* 1. العنوان والنص التوضيحي */}
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              {t("navbar.specifyLocation") || "Specify your location"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t("navbar.shippingNotice") ||
                "Shipping options and fees vary based on your location"}
            </p>
          </div>

          {/* 2. حقل اختيار الدولة مع علم CountryFlag */}
          <div className="flex flex-col gap-1.5">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full h-11 rounded-lg border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover text-popover-foreground max-h-56">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <CountryFlag
                        code={country.code}
                        className="w-6 h-4 shrink-0"
                      />
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. حقل إدخال الرمز البريدي */}
          <div className="w-full">
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={
                t("navbar.postalCodePlaceholder") || "Enter ZIP or postal code"
              }
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* 4. زر الحفظ الأساسي بلون البراند */}
          <Button
            onClick={handleSave}
            variant="primary"
            className="w-full h-10 mt-1 rounded-full text-sm font-semibold shadow-sm"
          >
            {t("navbar.save") || "Save"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
