import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function StoreReviewsFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();

  const ratingOptions = [
    {
      id: "r-4",
      value: 4,
      label: t("filters.ratingAndUp", {
        rating: "4.0",
        defaultValue: "4.0 & up",
      }),
    },
    {
      id: "r-4.5",
      value: 4.5,
      label: t("filters.ratingAndUp", {
        rating: "4.5",
        defaultValue: "4.5 & up",
      }),
    },
    {
      id: "r-5",
      value: 5,
      label: t("filters.ratingFive", "5.0"),
    },
  ];

  const handleRatingChange = (value) => {
    updateFilters({ rating: Number(value) });
  };

  const handleItemClick = (val) => {
    if (Number(filters.rating) === val) {
      updateFilters({ rating: null });
    }
  };

  return (
    <div className="flex flex-col gap-2 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.storeReviews", "Store reviews")}
      </h3>
      <p className="text-xs text-muted-foreground mb-1">
        {t("filters.basedOn5Stars", "Based on a 5-star rating system")}
      </p>

      <RadioGroup
        value={filters.rating ? String(filters.rating) : ""}
        onValueChange={handleRatingChange}
        className="gap-2.5"
      >
        {ratingOptions.map((opt) => (
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
