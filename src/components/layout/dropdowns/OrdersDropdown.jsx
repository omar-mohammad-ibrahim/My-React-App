import React, { useState } from "react";
import { ClipboardList, ShieldCheck, RotateCcw, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/Button";

export default function OrdersDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* أيقونة فتح القائمة */}
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Orders"
          className="flex items-center justify-center p-1.5 text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <ClipboardList className="h-[22px] w-[22px]" strokeWidth={1.5} />
        </button>
      </PopoverTrigger>

      {/* النافذة المنبثقة */}
      <PopoverContent
        align="center"
        sideOffset={10}
        className="w-72 rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col text-start">
          <h4 className="font-bold text-sm text-foreground mb-3">
            {t("navbar.orders") || "Orders"}
          </h4>

          {/* ميزات حماية المشتري المعتمدة في المتجر */}
          <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground mb-4">
            <li className="flex items-center gap-2 hover:text-foreground transition-colors">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>{t("navbar.securePayments") || "Secure payments"}</span>
            </li>
            <li className="flex items-center gap-2 hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4 text-primary shrink-0" />
              <span>{t("navbar.moneyBack") || "Money-back guarantee"}</span>
            </li>
            <li className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>
                {t("navbar.onTimeDelivery") || "Guaranteed on-time delivery"}
              </span>
            </li>
          </ul>

          {/* زر الذهاب لصفحة الطلبات */}
          <Button
            to="/orders"
            variant="primary"
            onClick={() => setIsOpen(false)}
            className="w-full h-10 rounded-full text-sm font-semibold shadow-sm"
          >
            {t("navbar.viewOrders") || "View Orders"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
