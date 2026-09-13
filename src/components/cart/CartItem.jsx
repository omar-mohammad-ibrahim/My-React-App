import { useDispatch } from "react-redux";
import { removeItem, toggleSelectItem } from "../../features/cart/cartSlice";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const itemPrice = Number(item.price) || 0;
  const itemImage =
    item.images?.[0] ||
    item.image ||
    "https://placehold.co/100x100?text=Product";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-border last:border-none">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Checkbox التحديد */}
        <input
          type="checkbox"
          checked={Boolean(item.selected)}
          onChange={() => dispatch(toggleSelectItem(item.id))}
          className="w-5 h-5 accent-[#eb5b00] rounded cursor-pointer shrink-0"
        />

        {/* صورة الصنف */}
        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0 border border-border">
          <img
            src={itemImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* تفاصيل النص */}
        <div className="flex flex-col gap-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate max-w-xs sm:max-w-md">
            {item.title}
          </h4>
          {item.variation && (
            <p className="text-xs text-muted-foreground">
              Option: {item.variation}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Min. order: {item.moq || 1} {item.unit || "pieces"}
          </p>
        </div>
      </div>

      {/* منطقة السعر، العداد، والحذف */}
      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pl-8 sm:pl-0">
        <div className="text-right">
          <span className="font-bold text-foreground text-sm sm:text-base">
            JOD {itemPrice.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground block">
            /{item.unit || "piece"}
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
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
