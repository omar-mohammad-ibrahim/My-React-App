import { useTranslation } from "react-i18next";
import { useProductFilters } from "../../hooks/useProductFilters";

import TradeAssuranceFilter from "./common/TradeAssuranceFilter";
import VerifiedSupplierFilter from "./common/VerifiedSupplierFilter";
import SupplierYearsFilter from "./common/SupplierYearsFilter";
import SupplierRegionFilter from "./common/SupplierRegionFilter";
import StoreReviewsFilter from "./common/StoreReviewsFilter";

import PriceRangeFilter from "./product-only/PriceRangeFilter";
import MoqFilter from "./product-only/MoqFilter";
import ProductSamplesFilter from "./product-only/ProductSamplesFilter";

export default function FiltersSidebar() {
  const { t } = useTranslation();
  const { filters } = useProductFilters();

  const isProducts = filters.view === "products";
  const isSuppliers = filters.view === "suppliers";

  return (
    <aside className="w-full select-none">
      <div className="flex flex-col divide-y divide-border/60">
        <div className="pb-4 flex flex-col gap-3.5">
          <h2 className="text-base font-bold text-foreground tracking-tight text-start">
            {t("filters.title", "Filters")}
          </h2>
          <TradeAssuranceFilter />
        </div>

        <div className="py-4">
          <VerifiedSupplierFilter />
        </div>

        <div className="py-4">
          <StoreReviewsFilter />
        </div>

        <div className="py-4">
          <MoqFilter />
        </div>

        {isProducts && (
          <>
            <div className="py-4">
              <PriceRangeFilter />
            </div>

            <div className="py-4">
              <ProductSamplesFilter />
            </div>
          </>
        )}

        <div className="py-4">
          <SupplierRegionFilter />
        </div>

        {isSuppliers && (
          <div className="py-4">
            <SupplierYearsFilter />
          </div>
        )}
      </div>
    </aside>
  );
}
