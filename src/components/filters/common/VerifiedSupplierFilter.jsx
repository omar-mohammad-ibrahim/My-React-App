import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export default function VerifiedSupplierFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const handleCheckedChange = (checked) => {
    updateFilters({ verified: checked });
  };

  return (
    <div className="flex flex-col gap-3 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.supplierFeatures", "Supplier features")}
      </h3>

      <div className="flex items-center gap-2">
        <Checkbox
          id="verified-supplier"
          checked={Boolean(filters.verified)}
          onCheckedChange={handleCheckedChange}
        />

        <Label
          htmlFor="verified-supplier"
          className="flex items-center gap-1.5 text-sm cursor-pointer select-none"
        >
          <span className="font-bold text-[#0066FF] tracking-tight">
            {t("filters.verified", "Verified")}
          </span>
          <span className="font-normal text-foreground">
            {t("filters.supplier", "Supplier")}
          </span>

          <span
            title={t(
              "filters.verifiedTooltip",
              "Verified by independent third-party inspection services",
            )}
          >
            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/80 hover:text-foreground transition-colors shrink-0" />
          </span>
        </Label>
      </div>
    </div>
  );
}
