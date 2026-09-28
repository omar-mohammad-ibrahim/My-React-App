import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PriceRangeFilter() {
  const { filters, updateFilters } = useProductFilters();

  return (
    <PriceRangeFields
      key={`${filters.minPrice ?? ""}-${filters.maxPrice ?? ""}`}
      minPrice={filters.minPrice}
      maxPrice={filters.maxPrice}
      updateFilters={updateFilters}
    />
  );
}

function PriceRangeFields({ minPrice, maxPrice, updateFilters }) {
  const { t } = useTranslation();
  const [min, setMin] = useState(minPrice ?? "");
  const [max, setMax] = useState(maxPrice ?? "");

  const handleApply = (e) => {
    e.preventDefault();
    updateFilters({
      minPrice: min !== "" ? Number(min) : null,
      maxPrice: max !== "" ? Number(max) : null,
    });
  };

  return (
    <div className="flex flex-col gap-2.5 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.price", "Price")}
      </h3>

      <form onSubmit={handleApply} className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t("filters.min", "Min.")}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="h-8 w-20 text-xs px-2.5 rounded-lg border border-border"
        />

        <span className="text-muted-foreground text-sm font-medium">-</span>

        <Input
          type="number"
          placeholder={t("filters.max", "Max.")}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="h-8 w-20 text-xs px-2.5 rounded-lg border border-border"
        />

        <Button
          type="submit"
          variant="alibaba"
          className="h-8 px-4 text-xs font-semibold"
        >
          {t("filters.ok", "OK")}
        </Button>
      </form>
    </div>
  );
}
