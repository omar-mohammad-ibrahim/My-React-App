import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/Button";

export default function CartDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items = useSelector((state) => state.cart?.items) || [];
  const currentCurrency = localStorage.getItem("appCurrency") || "JOD";

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* عنصر التفعيل (Trigger) */}
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Shopping Cart"
          className="relative flex items-center justify-center p-1.5 text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.5} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-xs">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </span>
          )}
        </button>
      </PopoverTrigger>

      {/* محتوى القائمة المنبثقة */}
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-80 sm:w-[340px] rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col">
          {/* عنوان القائمة */}
          <h3 className="font-bold text-sm text-foreground mb-3">
            {t("navbar.cart") || "Shopping cart"}
          </h3>

          {items.length === 0 ? (
            /* حالة السلة الفارغة */
            <div className="py-6 text-center">
              <p className="text-xs text-muted-foreground mb-4">
                {t("navbar.emptyCart") || "Your cart is empty"}
              </p>
              <Button
                to="/cart"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full h-9 rounded-full text-xs font-semibold"
              >
                {t("navbar.goToCart") || "Go to cart"}
              </Button>
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
                      className="flex items-center gap-3 bg-muted/50 hover:bg-muted/80 p-2 rounded-xl transition-colors"
                    >
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-background shrink-0 border border-border"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {item.variation || item.title}
                        </p>
                        <p className="font-bold text-xs text-foreground mt-0.5">
                          {currentCurrency} {price.toFixed(2)}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-muted-foreground shrink-0">
                        x{item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* المجموع الفرعي */}
              <div className="border-t border-border pt-3 mb-4 flex justify-between items-baseline">
                <span className="text-xs text-muted-foreground font-medium">
                  {t("navbar.subtotal") || "Subtotal excl. tax"}
                </span>
                <span className="text-base font-black text-foreground">
                  {currentCurrency} {subtotal.toFixed(2)}
                </span>
              </div>

              {/* زر الذهاب للسلة الموحد */}
              <Button
                to="/cart"
                variant="primary"
                onClick={() => setIsOpen(false)}
                className="w-full h-10 rounded-full text-sm font-semibold shadow-sm"
              >
                {t("navbar.goToCart") || "Go to cart"}
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
