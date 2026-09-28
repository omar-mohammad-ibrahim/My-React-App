import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useProductFilters } from "@/hooks/useProductFilters";
import { fetchProducts } from "@/features/products/productsSlice";

import ProductCardHorizontal from "./cards/ProductCardHorizontal";
import Button from "@/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { SearchX, AlertCircle, RotateCcw } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filters, clearAllFilters, setPage } = useProductFilters();

  const {
    items = [],
    isLoading,
    error,
  } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 1. تصفية المنتجات في الذاكرة
  const filteredProducts = useMemo(() => {
    const rawList = Array.isArray(items) ? items : items?.data || [];
    return rawList.filter((product) => filterProduct(product, filters));
  }, [items, filters]);

  // 2. تقسيم الصفحات (Pagination)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, filters.page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // حالة التحميل
  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-3" />
        <h3 className="text-lg font-bold text-foreground mb-1">
          {t("plp.errorTitle", "حدث خطأ أثناء تحميل المنتجات")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">{error}</p>
        <Button
          variant="outline"
          onClick={() => dispatch(fetchProducts())}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t("plp.retry", "إعادة المحاولة")}</span>
        </Button>
      </div>
    );
  }

  // حالة عدم وجود نتائج
  if (paginatedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-xl border border-dashed border-border bg-card/50 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">
          {t("plp.noProductsFound", "لم يتم العثور على أي منتجات مطابقة")}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          {t("plp.noProductsDesc", "جرب إزالة بعض الفلاتر لتوسيع نطاق البحث.")}
        </p>
        <Button
          variant="primary"
          onClick={clearAllFilters}
          className="px-6 shadow-sm"
        >
          {t("plp.clearAllFilters", "تفريغ جميع الفلاتر")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* قائمة المنتجات */}
      <div className="flex flex-col gap-4">
        {paginatedProducts.map((product) => (
          <ProductCardHorizontal key={product.id} product={product} />
        ))}
      </div>

      {/* مكوّن الـ Pagination */}
      {totalPages > 1 && (
        <Pagination className="pt-6 pb-8 border-t border-border/60">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(filters.page - 1)}
                className={
                  filters.page <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {getPageNumbers(filters.page, totalPages).map((p, idx) => (
              <PaginationItem key={idx}>
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={p === filters.page}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(filters.page + 1)}
                className={
                  filters.page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

function filterProduct(product, filters) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    moq,
    verified,
    tradeAssurance,
    hasSample,
    country,
    rating,
    years,
  } = filters;

  if (q) {
    const queryTokens = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const title = (product.title || "").toLowerCase();
    const cat = (product.category || "").toLowerCase();

    const isMatch = queryTokens.every((token) => {
      if (token.length <= 3) {
        const strictWordRegex = new RegExp(`\\b${token}s?\\b`, "i");
        return strictWordRegex.test(title) || strictWordRegex.test(cat);
      }
      const prefixRegex = new RegExp(`\\b${token}`, "i");
      return prefixRegex.test(title) || prefixRegex.test(cat);
    });

    if (!isMatch) return false;
  }

  const price = Number(product.price) || 0;
  if (minPrice !== null && price < minPrice) return false;
  if (maxPrice !== null && price > maxPrice) return false;

  const productMoq = Number(product.moq) || 1;
  if (moq !== null && productMoq > moq) return false;

  if (verified && !product.supplier?.verified) return false;
  if (tradeAssurance && !product.supplier?.tradeAssurance) return false;
  if (hasSample && !product.hasSample) return false;

  if (
    country &&
    product.supplier?.country?.toUpperCase() !== country.toUpperCase()
  )
    return false;

  const pRating = Number(product.rating || product.supplier?.rating || 0);
  if (rating !== null && pRating < rating) return false;

  const sYears = Number(product.supplier?.years || 0);
  if (years !== null && sYears < years) return false;

  if (category === "all") return true;
  if (category && product.category?.toLowerCase() !== category.toLowerCase())
    return false;

  return true;
}

function getPageNumbers(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2)
    return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 rounded-xl border border-border bg-card p-4 animate-pulse">
      <div className="w-full sm:w-56 h-56 shrink-0 bg-muted/60 rounded-lg" />
      <div className="flex-1 flex flex-col justify-between py-1 w-full gap-4">
        <div className="space-y-2">
          <div className="h-5 bg-muted/70 rounded-md w-3/4" />
          <div className="h-5 bg-muted/50 rounded-md w-1/2" />
          <div className="h-7 bg-muted/80 rounded-md w-28 mt-4" />
        </div>
        <div className="pt-3 border-t border-border/40 space-y-2">
          <div className="h-4 bg-muted/60 rounded-md w-44" />
        </div>
      </div>
      <div className="w-full sm:w-36 shrink-0 flex flex-col gap-2.5 pt-1">
        <div className="h-9 bg-muted/70 rounded-full w-full" />
        <div className="h-9 bg-muted/40 rounded-full w-full" />
      </div>
    </div>
  );
}
