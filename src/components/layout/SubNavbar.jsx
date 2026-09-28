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
    <div className="relative w-full border-b border-border bg-card transition-colors select-none">
      {isPlpPage ? (
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 sm:gap-8 text-base sm:text-xl font-bold">
          <button
            type="button"
            onClick={() => switchView("products")}
            className={`py-2.5 sm:py-3 transition-colors cursor-pointer border-b-[3px] -mb-px ${
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
            className={`py-2.5 sm:py-3 transition-colors cursor-pointer border-b-[3px] -mb-px ${
              isSuppliers
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t("subheader.suppliers", "Suppliers")}
          </button>
        </div>
      ) : (
        /* شريط أفقي قابل للسحب باللمس على الموبايل بدون انكسار للأسطر */
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none text-xs sm:text-sm font-medium">
          {/* المجموعة الرئيسية الأولى */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <MegaNavItem
              label={t("subheader.allCategories", "All categories")}
              icon={Menu}
              minHeight="min-h-[400px]"
            >
              {/* محتوى الـ Categories للكمبيوتر */}
            </MegaNavItem>

            <MegaNavItem
              label={t("subheader.verified", "Verified manufacturers")}
              minHeight="min-h-[380px]"
            >
              {/* محتوى الـ Verified للكمبيوتر */}
            </MegaNavItem>

            <MegaNavItem
              label={t("subheader.dropshipping", "Dropshipping")}
              minHeight="min-h-[300px]"
            >
              {/* محتوى Dropshipping */}
            </MegaNavItem>
          </div>

          {/* المجموعة الثانوية: تختفي تلقائياً في الشاشات الضيقة جداً أو تظهر عبر السحب */}
          <div className="flex items-center gap-4 sm:gap-6 text-muted-foreground shrink-0">
            <MegaNavItem
              label={t("subheader.about", "About NexusTrade.com")}
              minHeight="min-h-[300px]"
            />

            <MegaNavItem
              label={t("subheader.help", "Help Center")}
              minHeight="min-h-[320px]"
            />

            <MegaNavItem
              label={t("subheader.accio", "Accio Work")}
              minHeight="min-h-[300px]"
            />

            <MegaNavItem
              label={t("subheader.sell", "Sell on NexusTrade.com")}
              minHeight="min-h-[300px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// المكون الموحد: الـ Mega Menu تنزل فقط على الشاشات الكبيرة (Desktop)
// ===========================================================================
function MegaNavItem({
  label,
  icon: Icon,
  children,
  minHeight = "min-h-[350px]",
}) {
  return (
    <div className="group flex items-center py-2.5 sm:py-3 cursor-pointer shrink-0">
      {/* نص الرابط والأيقونة */}
      <span className="relative flex items-center gap-1.5 text-foreground transition-colors group-hover:text-primary whitespace-nowrap">
        {Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />}
        <span>{label}</span>

        {/* الخط السفلي النشط */}
        <span className="absolute -bottom-2.5 sm:-bottom-3 inset-x-0 h-[2px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-start duration-200" />
      </span>

      {/* القائمة المنسدلة: مفعلة بحركة النزول فقط من شاشات lg فما فوق (hidden lg:block) لمنع تعليق الموبايل */}
      <div className="hidden lg:block absolute top-full inset-x-0 w-full overflow-hidden pointer-events-none z-50">
        <div
          className="
            w-full border-b border-border bg-popover text-popover-foreground
            -translate-y-full group-hover:translate-y-0
            transition-transform duration-500 ease-out
            group-hover:pointer-events-auto
          "
        >
          <div className={`max-w-7xl mx-auto px-6 sm:px-8 py-8 ${minHeight}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
