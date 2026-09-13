import { useDispatch } from "react-redux";
import { toggleSelectAll } from "../../features/cart/cartSlice";
import CartItem from "./CartItem";

export default function CartItemList({ items }) {
  const dispatch = useDispatch();

  // التحقق الحسابي من تحديد كافة الأصناف
  const isAllSelected =
    items.length > 0 && items.every((item) => Boolean(item.selected));

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-xs">
      {/* شريط تحديد الكل في الأعلى */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={() => dispatch(toggleSelectAll())}
          className="w-5 h-5 accent-[#eb5b00] rounded cursor-pointer shrink-0"
        />
        <span className="font-bold text-foreground text-sm sm:text-base">
          Select all variations ({items.length})
        </span>
      </div>

      {/* قائمة المنتجات المحتواة */}
      <div className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
