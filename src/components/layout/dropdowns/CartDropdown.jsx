import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CartDropdown() {
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart.items) || [];

  // 1. حساب إجمالي عدد القطع للأيقونة
  const totalQuantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0,
  );

  // 2. حساب المجموع الفرعي التراكمي
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );

  return (
    <div className="group relative flex cursor-pointer items-center text-foreground hover:text-[#eb5b00] transition-colors">
      {/* أيقونة السلة مع العداد */}
      <div className="relative">
        <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.5} />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2.5 bg-[#eb5b00] text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-xs">
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </div>

      {/* نافذة القائمة المنسدلة عند التحويم */}
      <div className="absolute right-0 top-full hidden pt-3 group-hover:block z-50 w-80 sm:w-[340px]">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl cursor-default text-foreground">
          <h3 className="font-bold text-base mb-3">
            {t("navbar.cart") || "Shopping cart"}
          </h3>

          {items.length === 0 ? (
            /* حالة السلة الفارغة */
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t("navbar.emptyCart") || "Your cart is empty"}
              </p>
              <Link
                to="/cart"
                className="inline-block w-full border border-border text-foreground hover:bg-muted py-2 rounded-full font-bold text-sm transition-colors text-center"
              >
                {t("navbar.goToCart") || "Go to cart"}
              </Link>
            </div>
          ) : (
            /* قائمة المنتجات المصغرة */
            <>
              <div className="max-h-60 overflow-y-auto flex flex-col gap-2.5 pr-1 mb-4">
                {items.map((item) => {
                  const imageSrc =
                    item.images?.[0] ||
                    item.image ||
                    "https://placehold.co/80x80";
                  const price = Number(item.price) || 0;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-muted/40 hover:bg-muted/70 p-2 rounded-xl transition-colors"
                    >
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-background shrink-0 border border-border"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground truncate">
                          {item.variation || item.title}
                        </p>
                        <p className="font-bold text-sm text-foreground">
                          JOD {price.toFixed(2)}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-muted-foreground shrink-0">
                        x {item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* المجموع الفرعي */}
              <div className="border-t border-border pt-3 mb-4 flex justify-between items-baseline">
                <span className="text-xs text-muted-foreground font-medium">
                  Subtotal excl. tax
                </span>
                <span className="text-base font-black text-foreground">
                  JOD {subtotal.toFixed(2)}
                </span>
              </div>

              {/* زر الذهاب للسلة */}
              <Link
                to="/cart"
                className="block w-full bg-[#eb5b00] hover:bg-[#cc4f00] text-white py-2.5 rounded-full font-bold text-sm text-center transition-colors shadow-xs"
              >
                {t("navbar.goToCart") || "Go to cart"}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
