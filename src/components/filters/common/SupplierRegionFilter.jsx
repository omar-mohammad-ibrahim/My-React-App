import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CountryFlag from "@/components/common/CountryFlag";

const COUNTRIES = [
  { code: "IN", defaultName: "India" },
  { code: "CN", defaultName: "China" },
  { code: "HK", defaultName: "Hong Kong SAR China" },
  { code: "PK", defaultName: "Pakistan" },
];

export default function SupplierRegionFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useProductFilters();
  const selectedCountry = filters.country;

  const visibleCountries = selectedCountry
    ? COUNTRIES.filter((c) => c.code === selectedCountry)
    : COUNTRIES;

  const handleToggle = (code) => {
    if (selectedCountry === code) {
      updateFilters({ country: null });
    } else {
      updateFilters({ country: code });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-start">
      <h3 className="text-sm font-semibold text-foreground">
        {t("filters.supplierRegion", "Supplier country/region")}
      </h3>

      <div className="flex flex-col gap-2.5">
        {visibleCountries.map((country) => {
          const isChecked = selectedCountry === country.code;
          const countryName = t(
            `filters.countries.${country.code}`,
            country.defaultName,
          );

          return (
            <div key={country.code} className="flex items-center gap-2">
              <Checkbox
                id={`country-${country.code}`}
                checked={isChecked}
                onCheckedChange={() => handleToggle(country.code)}
              />
              <Label
                htmlFor={`country-${country.code}`}
                className="flex items-center gap-2 text-sm font-normal text-foreground cursor-pointer select-none"
              >
                <CountryFlag
                  code={country.code}
                  className="w-5 h-3.5 shrink-0"
                />
                <span>{countryName}</span>
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
