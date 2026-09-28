import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { removeItem, toggleSelectItem } from "../../features/cart/cartSlice";
import { Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentCurrency = localStorage.getItem("appCurrency") || "JOD";

  const itemPrice = Number(item.price) || 0;
  const itemImage =
    item.images?.[0] ||
    item.image ||
    "https://placehold.co/100x100?text=Product";

  const unitLabel = item.unit
    ? t(`cart.units.${item.unit}`, item.unit)
    : Number(item.moq) > 1
      ? t("cart.units.pieces", "pieces")
      : t("cart.units.piece", "piece");

  return (
    <div className="flex flex-row sm:items-center justify-between gap-4 py-4 text-start">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={Boolean(item.selected)}
          onChange={() => dispatch(toggleSelectItem(item.id))}
          className="w-5 h-5 accent-primary cursor-pointer shrink-0"
        />

        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0 border border-border">
          <img
            src={itemImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate max-w-xs sm:max-w-md">
            {item.title}
          </h4>
          {item.variation && (
            <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
              {t("cart.option", {
                value: item.variation,
                defaultValue: `Option: ${item.variation}`,
              })}
            </p>
          )}
          <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
            {t("cart.minOrder", {
              moq: item.moq || 1,
              unit: unitLabel,
              defaultValue: `Min. order: ${item.moq || 1} ${unitLabel}`,
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 ps-8 sm:ps-0">
        <div className="flex items-center gap-1 text-end">
          <span className="font-bold text-foreground text-sm sm:text-base">
            {currentCurrency} {itemPrice.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground block">
            /{unitLabel}
          </span>
        </div>

        <QuantitySelector
          itemId={item.id}
          quantity={item.quantity}
          moq={item.moq || 1}
        />

        <button
          type="button"
          onClick={() => dispatch(removeItem(item.id))}
          className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer text-lg"
          title={t("cart.removeItem", "Remove item")}
          aria-label={t("cart.removeItem", "Remove item")}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
