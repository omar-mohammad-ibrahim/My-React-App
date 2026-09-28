import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { X, Trash2 } from "lucide-react";

export default function ActiveFilterChips() {
  const { t } = useTranslation();
  const { filters, updateFilters, clearAllFilters } = useProductFilters();

  const activeChips = useMemo(() => {
    const chips = [];

    // 1. فلتر البحث
    if (filters.q) {
      chips.push({
        id: "q",
        label: t("filters.active.search", {
          query: filters.q,
          defaultValue: `Search: "${filters.q}"`,
        }),
        onRemove: () => updateFilters({ q: "" }),
      });
    }

    // 2. فلتر السعر
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      let priceLabel = "";
      if (filters.minPrice !== null && filters.maxPrice !== null) {
        priceLabel = t("filters.active.priceRange", {
          min: filters.minPrice,
          max: filters.maxPrice,
          defaultValue: `Price: ${filters.minPrice} - ${filters.maxPrice}`,
        });
      } else if (filters.minPrice !== null) {
        priceLabel = t("filters.active.priceMin", {
          min: filters.minPrice,
          defaultValue: `Price: ≥ ${filters.minPrice}`,
        });
      } else {
        priceLabel = t("filters.active.priceMax", {
          max: filters.maxPrice,
          defaultValue: `Price: ≤ ${filters.maxPrice}`,
        });
      }

      chips.push({
        id: "price",
        label: priceLabel,
        onRemove: () => updateFilters({ minPrice: null, maxPrice: null }),
      });
    }

    // 3. تقييم النجوم
    if (filters.rating !== null) {
      const ratingLabel =
        Number(filters.rating) === 5 ? "5.0" : `${filters.rating}.0 & up`;

      chips.push({
        id: "rating",
        label: t("filters.active.reviews", {
          rating: ratingLabel,
          defaultValue: `Store reviews: ${ratingLabel}`,
        }),
        onRemove: () => updateFilters({ rating: null }),
      });
    }

    // 4. الحد الأدنى للطلب
    if (filters.moq !== null) {
      chips.push({
        id: "moq",
        label: t("filters.active.moq", {
          moq: filters.moq,
          defaultValue: `MOQ: ≤ ${filters.moq}`,
        }),
        onRemove: () => updateFilters({ moq: null }),
      });
    }

    // 5. التصنيف
    if (filters.category) {
      chips.push({
        id: "category",
        label: t("filters.active.category", {
          category: filters.category,
          defaultValue: `Category: ${filters.category}`,
        }),
        onRemove: () => updateFilters({ category: "" }),
      });
    }

    // 6. دولة المورد
    if (filters.country) {
      const countryCode = filters.country.toUpperCase();
      const countryTranslated = t(
        `filters.countries.${countryCode}`,
        countryCode,
      );
      chips.push({
        id: "country",
        label: t("filters.active.region", {
          country: countryTranslated,
          defaultValue: `Region: ${countryCode}`,
        }),
        onRemove: () => updateFilters({ country: "" }),
      });
    }

    // 7. سنوات الخبرة
    if (filters.years !== null) {
      chips.push({
        id: "years",
        label: t("filters.active.experience", {
          years: filters.years,
          defaultValue: `Experience: ${filters.years}+ yrs`,
        }),
        onRemove: () => updateFilters({ years: null }),
      });
    }

    // 8. ضمان التجارة
    if (filters.tradeAssurance) {
      chips.push({
        id: "tradeAssurance",
        label: t("filters.tradeAssurance", "Trade Assurance"),
        onRemove: () => updateFilters({ tradeAssurance: false }),
      });
    }

    // 9. مورد موثق
    if (filters.verified) {
      chips.push({
        id: "verified",
        label: t("filters.verifiedSupplier", "Verified Supplier"),
        onRemove: () => updateFilters({ verified: false }),
      });
    }

    // 10. عينات مدفوعة
    if (filters.hasSample) {
      chips.push({
        id: "hasSample",
        label: t("filters.paidSamples", "Paid Samples"),
        onRemove: () => updateFilters({ hasSample: false }),
      });
    }

    return chips;
  }, [filters, updateFilters, t]);

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-1">
      {activeChips.map((chip) => (
        <div
          key={chip.id}
          className="inline-flex items-center gap-2 rounded-md bg-muted/70 px-3 py-1.5 text-xs sm:text-sm font-normal text-foreground transition-colors hover:bg-muted"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-0.5 rounded-xs"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={clearAllFilters}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-1 px-1.5"
      >
        <Trash2 className="h-4 w-4 stroke-[1.75]" />
        <span>{t("filters.clearAll", "Clear all filters")}</span>
      </button>
    </div>
  );
}
