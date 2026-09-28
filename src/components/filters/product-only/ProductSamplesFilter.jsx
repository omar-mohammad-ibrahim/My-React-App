import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ProductSamplesFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const handleCheckedChange = (checked) => {
    updateFilters({ hasSample: checked });
  };

  return (
    <div className="flex flex-col gap-2 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.productFeatures", "Product features")}
      </h3>
      <div className="flex items-center gap-2">
        <Checkbox
          id="has-sample"
          checked={Boolean(filters.hasSample)}
          onCheckedChange={handleCheckedChange}
        />
        <Label
          htmlFor="has-sample"
          className="text-sm cursor-pointer select-none"
        >
          {t("filters.paidSamples", "Paid samples")}
        </Label>
      </div>
    </div>
  );
}
