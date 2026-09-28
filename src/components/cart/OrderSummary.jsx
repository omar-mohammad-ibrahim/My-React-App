import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

export default function OrderSummary({ items, selectedCount }) {
  const { t } = useTranslation();
  const currentCurrency = localStorage.getItem("appCurrency") || "JOD";

  const selectedItems = items.filter((item) => item.selected);

  const itemSubtotal = selectedItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );

  const shippingFee = selectedCount > 0 ? 15.0 : 0;
  const shippingDiscount = selectedCount > 0 ? 5.0 : 0;
  const finalTotal = Math.max(0, itemSubtotal + shippingFee - shippingDiscount);

  const countUnit =
    selectedCount === 1 ? t("cart.item", "item") : t("cart.items", "items");

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-xs text-start">
      <h2 className="text-lg font-bold text-foreground mb-4">
        {t("cart.orderSummary", {
          count: selectedCount,
          unit: countUnit,
          defaultValue: `Order summary (${selectedCount} ${countUnit})`,
        })}
      </h2>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-4 border-b border-border pb-4">
        <div className="flex justify-between">
          <span>{t("cart.itemSubtotal", "Item subtotal")}</span>
          <span className="font-semibold text-foreground">
            {currentCurrency} {itemSubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>{t("cart.shippingFee", "Shipping fee")}</span>
          <span className="font-semibold text-foreground">
            {currentCurrency} {shippingFee.toFixed(2)}
          </span>
        </div>

        {shippingDiscount > 0 && (
          <div className="flex justify-between text-success">
            <span>{t("cart.shippingDiscount", "Shipping discount")}</span>
            <span className="font-semibold">
              - {currentCurrency} {shippingDiscount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-foreground text-base">
          {t("cart.subtotalExclTax", "Subtotal excl. tax")}
        </span>
        <span className="font-black text-xl text-foreground">
          {currentCurrency} {finalTotal.toFixed(2)}
        </span>
      </div>

      <Button
        variant="primary"
        disabled={selectedCount === 0}
        className="w-full py-3.5 shadow-sm"
      >
        {t("cart.checkout", {
          count: selectedCount,
          defaultValue: `Check out (${selectedCount})`,
        })}
      </Button>
    </div>
  );
}
