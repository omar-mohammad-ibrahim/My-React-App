import { useDispatch } from "react-redux";
import { updateQuantity } from "../../features/cart/cartSlice";

export default function QuantitySelector({ itemId, quantity, moq = 1 }) {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (quantity > moq) {
      dispatch(updateQuantity({ id: itemId, quantity: quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: itemId, quantity: quantity + 1 }));
  };

  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden bg-card">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= moq}
        className="px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        -
      </button>

      <span className="w-12 text-center text-sm font-bold bg-transparent border-x border-border select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        className="px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
