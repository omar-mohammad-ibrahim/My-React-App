import { useDispatch } from "react-redux";
// تأكد من مسار الاستيراد حسب مشروعك
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
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        onClick={handleDecrease}
        disabled={quantity <= moq}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        -
      </button>

      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center text-sm font-semibold border-x border-gray-300 py-1 outline-none bg-white"
      />

      <button
        onClick={handleIncrease}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
      >
        +
      </button>
    </div>
  );
}
