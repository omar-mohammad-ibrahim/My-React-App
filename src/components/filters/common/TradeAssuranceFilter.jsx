import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function TradeAssuranceFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const handleCheckedChange = (checked) => {
    updateFilters({ tradeAssurance: checked });
  };

  return (
    <div className="flex flex-col gap-1 text-start">
      <div className="flex items-center gap-2">
        <Checkbox
          id="trade-assurance"
          checked={Boolean(filters.tradeAssurance)}
          onCheckedChange={handleCheckedChange}
        />

        <Label
          htmlFor="trade-assurance"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground cursor-pointer select-none"
        >
          <svg
            className="w-4 h-4 text-[#E89806] fill-current shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-1.5c-1.39-.27-2.5-1.42-2.5-2.5h1.8c0 .55.45 1 1.2 1 .75 0 1.2-.45 1.2-1 0-.55-.45-.85-1.5-1.15-1.5-.45-2.7-1.15-2.7-2.35 0-1.08.92-2.15 2.5-2.42V5h2v1.5c1.39.27 2.2 1.35 2.2 2.5h-1.8c0-.55-.4-1-1.1-1s-1.1.45-1.1 1c0 .55.45.85 1.5 1.15 1.5.45 2.7 1.15 2.7 2.35 0 1.08-.92 2.15-2.5 2.5V16z" />
          </svg>
          <span>{t("filters.tradeAssurance", "Trade Assurance")}</span>
        </Label>
      </div>

      <p className="text-xs text-muted-foreground ps-6 leading-relaxed select-none">
        {t(
          "filters.tradeAssuranceDesc",
          "Protects your orders on NexusTrade.com",
        )}
      </p>
    </div>
  );
}
