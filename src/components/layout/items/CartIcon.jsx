import { useState } from "react";
import CartDropdown from "../dropdowns/CartDropdown";

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* 1. الحاوية الأساسية النسبية مع مستمعات حركة الماوس */
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 2. الزر أو الأيقونة الظاهرة */}
      <button className="flex items-center gap-1 p-2 text-gray-700 hover:text-orange-600">
        🛒
      </button>

      {/* 3. حاوية النافذة مع جسر الحشو (pt-2) */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 pt-2">
          <CartDropdown />
        </div>
      )}
    </div>
  );
}
