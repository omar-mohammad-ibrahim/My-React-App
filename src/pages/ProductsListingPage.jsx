import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productService } from "../services/productService";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6; // عدد المنتجات في كل صفحة

export default function ProductsListingPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(1); // العودة للصفحة الأولى عند اختيار قسم جديد

    productService
      .getByCategory(currentCategory)
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [currentCategory]);

  // حسابات الصفحات
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // صعود سلس لأعلى الصفحة
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* ترويسة الصفحة والتصنيف الحالي */}
        <div className="mb-6 border-b border-border pb-4">
          <h1 className="text-2xl font-bold capitalize text-foreground">
            {currentCategory
              ? currentCategory.replace(/-/g, " ")
              : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length} {t("products.found") || "products found"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* الشريط الجانبي للفلاتر */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="border border-border rounded-xl p-5 bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold text-foreground mb-4">Filters</h3>
              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    className="rounded border-border accent-primary"
                  />
                  <span>Verified Supplier</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    className="rounded border-border accent-primary"
                  />
                  <span>Trade Assurance</span>
                </label>
              </div>
            </div>
          </aside>

          {/* شبكة عرض المنتجات والترقيم */}
          <main className="lg:col-span-9 flex flex-col justify-between">
            {loading ? (
              <div className="py-24 text-center font-medium text-muted-foreground">
                Loading products...
              </div>
            ) : error ? (
              <div className="py-24 text-center font-medium text-destructive">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center font-medium text-muted-foreground">
                No products found in this category.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentProducts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      className="group border border-border rounded-xl p-4 bg-card text-card-foreground hover:shadow-lg hover:border-primary/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                          <img
                            src={
                              item.images?.[0] ||
                              item.image ||
                              "https://via.placeholder.com/200"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <h4 className="font-medium line-clamp-2 text-sm text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <div className="mt-4">
                        <p className="text-lg font-black text-primary">
                          JOD {item.price}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Min. order: {item.moq || 50} pieces
                        </p>
                        {item.supplier && (
                          <p className="text-xs text-muted-foreground mt-2 truncate font-medium">
                            {item.supplier.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* شريط ترقيم وتصفح الصفحات (Pagination) */}
                {totalPages > 1 && (
                  <div className="mt-12 pt-6 border-t border-border">
                    <Pagination>
                      <PaginationContent>
                        {/* زر السابق */}
                        <PaginationItem>
                          <PaginationPrevious
                            text={t("pagination.previous") || "السابق"}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {/* أرقام الصفحات */}
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {/* زر التالي */}
                        <PaginationItem>
                          <PaginationNext
                            text={t("pagination.next") || "التالي"}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
