import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function SubNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const isPlpPage = location.pathname.startsWith("/products");

  const { filters, switchView } = useProductFilters();

  const isProducts = filters.view !== "suppliers";
  const isSuppliers = filters.view === "suppliers";

  return (
    <div className="w-full border-b border-border bg-card transition-colors">
      {isPlpPage ? (
        <div className="container max-w-7xl mx-auto px-4 flex items-center gap-8 text-xl font-bold">
          <button
            type="button"
            onClick={() => switchView("products")}
            className={`py-3 transition-colors cursor-pointer border-b-[3px] -mb-px ${
              isProducts
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t("subheader.products", "Products")}
          </button>

          <button
            type="button"
            onClick={() => switchView("suppliers")}
            className={`py-3 transition-colors cursor-pointer border-b-[3px] -mb-px ${
              isSuppliers
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t("subheader.suppliers", "Suppliers")}
          </button>
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between py-2 text-sm font-medium">
          <div className="flex items-center gap-6 text-foreground">
            <div className="group relative flex cursor-pointer items-center gap-2 py-1.5 transition-colors hover:text-primary">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              <span>{t("subheader.allCategories", "All categories")}</span>

              <div className="absolute top-full start-0 z-50 hidden w-[800px] pt-3 group-hover:block">
                <div className="h-[400px] cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    {t("subheader.allCategories", "All categories")}
                  </h3>
                </div>
              </div>
            </div>

            <div className="group relative cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.verified", "Verified manufacturers")}</span>

              <div className="absolute top-full start-0 z-50 hidden w-[600px] pt-3 group-hover:block">
                <div className="h-[300px] cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    {t("subheader.verified", "Verified manufacturers")}
                  </h3>
                </div>
              </div>
            </div>

            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.dropshipping", "Dropshipping")}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.about", "About Alibaba.com")}</span>
            </div>

            <div className="group relative cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.help", "Help Center")}</span>

              <div className="absolute top-full end-0 z-50 hidden w-[400px] pt-3 group-hover:block">
                <div className="cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    {t("subheader.help", "Help Center")}
                  </h3>
                </div>
              </div>
            </div>

            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.accio", "Accio Work")}</span>
            </div>

            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.sell", "Sell on Alibaba.com")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
