import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    items = [],
    isLoading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // حالة الخطأ (Error State)
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="mb-2 text-xl font-bold text-destructive">
          {t("products.error_msg")}
        </h3>
        <p className="mb-4 text-muted-foreground">{error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary-hover shadow-sm"
        >
          {t("products.try_again")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* شبكة عرض المنتجات المتجاوبة */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* حالة عدم وجود منتجات (Empty State) */}
      {!isLoading && items.length === 0 && (
        <div className="py-20 text-center font-medium text-muted-foreground">
          {t("products.no_products")}
        </div>
      )}
    </div>
  );
}
