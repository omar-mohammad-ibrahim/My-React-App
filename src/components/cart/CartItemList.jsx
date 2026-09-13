import { useDispatch } from "react-redux";
import { toggleSelectAll } from "../../features/cart/cartSlice";
import CartItem from "./CartItem";

export default function CartItemList({ items }) {
  const dispatch = useDispatch();

  // حساب هل جميع المنتجات محددة أم لا (عشان الشيك بوكس الرئيسي)
  const isAllSelected =
    items.length > 0 && items.every((item) => item.selected);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* تحديد الكل */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={() => dispatch(toggleSelectAll())}
          className="w-5 h-5 accent-[#E65A00] cursor-pointer rounded"
        />
        <span className="font-bold text-gray-900">
          Select all items ({items.length})
        </span>
      </div>

      {/* عرض المنتجات برمجياً باستخدام map */}
      <div className="mt-4 flex flex-col">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
