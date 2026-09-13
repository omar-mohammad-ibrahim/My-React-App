import { useDispatch } from "react-redux";
import { removeItem, toggleSelectItem } from "../../features/cart/cartSlice";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      {/* زر تحديد المنتج المربوط بـ Redux */}
      <input
        type="checkbox"
        checked={item.selected || false}
        onChange={() => dispatch(toggleSelectItem(item.id))}
        className="w-5 h-5 accent-[#E65A00] cursor-pointer rounded"
      />

      {/* صورة المنتج الديناميكية */}
      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
        <img
          src={item.images?.[0] || "https://via.placeholder.com/100"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex justify-between items-center">
        <div className="max-w-[50%]">
          {/* اسم المنتج */}
          <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
            {item.title || item.description}
          </h4>
          <p className="text-xs text-gray-500">
            Min. order: {item.moq || 1} boxes
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* السعر الحقيقي */}
          <div className="font-bold text-gray-900">
            JOD {Number(item.price).toFixed(2)}
            <span className="text-xs text-gray-500 font-normal"> /box</span>
          </div>

          {/* مكون الكمية نمرر له الـ ID والكمية الحالية */}
          <QuantitySelector
            itemId={item.id}
            quantity={item.quantity}
            moq={item.moq}
          />

          {/* زر سلة المهملات مربوط بدالة الحذف */}
          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="text-gray-400 hover:text-red-500 cursor-pointer text-xl transition-colors"
            title="Remove item"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
