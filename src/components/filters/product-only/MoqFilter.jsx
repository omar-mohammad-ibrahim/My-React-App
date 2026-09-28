import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function MoqFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const [moq, setMoq] = useState(filters.moq ?? "");

  useEffect(() => {
    setMoq(filters.moq ?? "");
  }, [filters.moq]);

  const handleApply = (e) => {
    e.preventDefault();
    updateFilters({
      moq: moq !== "" ? Number(moq) : null,
    });
  };

  return (
    <div className="flex flex-col gap-2.5 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.minOrder", "Min. order")}
      </h3>

      <form onSubmit={handleApply} className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t("filters.minOrderPlaceholder", "Min. order")}
          value={moq}
          onChange={(e) => setMoq(e.target.value)}
          className="h-8 w-44 text-xs px-2.5 rounded-lg border border-border"
        />

        <Button
          type="submit"
          variant="NexusTrade"
          className="h-8 px-4 text-xs font-semibold"
        >
          {t("filters.ok", "OK")}
        </Button>
      </form>
    </div>
  );
}
