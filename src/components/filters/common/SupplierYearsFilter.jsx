import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SupplierYearsFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const yearsOptions = [
    {
      id: "y-5",
      value: 5,
      label: t("filters.yearsPlus", { count: 5, defaultValue: "5+ years" }),
    },
    {
      id: "y-10",
      value: 10,
      label: t("filters.yearsPlus", { count: 10, defaultValue: "10+ years" }),
    },
    {
      id: "y-15",
      value: 15,
      label: t("filters.yearsPlus", { count: 15, defaultValue: "15+ years" }),
    },
  ];

  const handleYearsChange = (value) => {
    updateFilters({ years: Number(value) });
  };

  const handleItemClick = (val) => {
    if (Number(filters.years) === val) {
      updateFilters({ years: null });
    }
  };

  return (
    <div className="flex flex-col gap-2 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.yearsOnPlatform", "Years on NexusTrade.com")}
      </h3>

      <RadioGroup
        value={filters.years ? String(filters.years) : ""}
        onValueChange={handleYearsChange}
        className="gap-2.5"
      >
        {yearsOptions.map((opt) => (
          <div key={opt.id} className="flex items-center gap-2">
            <RadioGroupItem
              value={String(opt.value)}
              id={opt.id}
              onClick={() => handleItemClick(opt.value)}
            />
            <Label
              htmlFor={opt.id}
              className="text-sm font-normal cursor-pointer select-none"
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
