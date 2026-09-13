import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { syncCartToFirebase } from "../../services/cartService"; // سننشئه بالخطوة 3

export default function AddToCartModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  // 1. تحديد الحد الأدنى للطلب (MOQ)
  const moq = product.moq || 10;

  // 2. حالة الكمية (تبدأ إجبارياً من الـ MOQ)
  const [quantity, setQuantity] = useState(moq);
  const [selectedType, setSelectedType] = useState("2-way audio");

  if (!isOpen) return null;

  // 3. العملية الحسابية اللحظية للمجموع
  const unitPrice = Number(product.price || 44.09);
  const subtotal = (unitPrice * quantity).toFixed(2);

  // 4. أزرار التحكم بالكمية
  const handleDecrease = () => {
    if (quantity > moq) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // 5. زر تأكيد الإضافة للسلة
  const handleConfirmAddToCart = async () => {
    // أ) الإضافة في Redux لتحديث الواجهة فوراً
    dispatch(
      addToCart({
        product,
        quantity,
        variation: selectedType,
      }),
    );

    // ب) حفظ النسخة في Firebase إذا كان المستخدم مسجل دخول
    if (user?.uid) {
      const updatedCart = [
        ...cartItems,
        {
          id: product.id,
          title: product.title || product.name,
          price: unitPrice,
          quantity,
          moq,
          variation: selectedType,
          selected: true,
        },
      ];
      await syncCartToFirebase(user.uid, updatedCart);
    }

    onClose(); // إغلاق النافذة
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      {/* جسم النافذة المنبثقة من اليمين */}
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        {/* رأس النافذة */}
        <div>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Select variations and quantity
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* عرض السعر والحد الأدنى */}
          <div className="mb-6">
            <div className="text-2xl font-extrabold text-gray-900">
              JOD {unitPrice}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Min. order (MOQ): {moq} units
            </div>
          </div>

          {/* خيارات النوع (Variations) */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Variation
            </label>
            <div className="flex gap-2">
              {["2-way audio", "Video Doorbell"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs rounded-md border cursor-pointer font-medium transition-all ${
                    selectedType === type
                      ? "border-[#E65A00] text-[#E65A00] bg-orange-50 font-bold"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* محدد الكمية اليدوي مع حماية الـ MOQ */}
          <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 my-4">
            <span className="text-sm font-semibold text-gray-800">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= moq}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* أسفل النافذة: المجموع وزر الإضافة */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-xl font-black text-gray-900">
              JOD {subtotal}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirmAddToCart}
            className="w-full bg-[#E65A00] hover:bg-[#c94f00] text-white font-bold py-3.5 rounded-full transition-colors cursor-pointer text-center"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
