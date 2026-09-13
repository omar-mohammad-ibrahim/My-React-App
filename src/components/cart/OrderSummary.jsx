import BuyerProtection from "./BuyerProtection";

export default function OrderSummary({ items }) {
  // 1. استخراج المنتجات التي حددها المستخدم فقط (الصح البرتقالي)
  const selectedItems = items.filter((item) => item.selected);
  const selectedCount = selectedItems.length;

  // 2. عملية الحساب: المجموع = (السعر * الكمية) لكل منتج محدد
  const itemSubtotal = selectedItems.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  // 3. حساب شحن تقريبي (مثال: 15 دينار لكل منتج مختلف، أو صفر إذا مافي منتجات)
  const shippingFee = selectedCount > 0 ? selectedCount * 15.5 : 0;

  // 4. خصم وهمي أو حقيقي (مثلاً خصم 5% على الشحن)
  const shippingDiscount = shippingFee > 0 ? shippingFee * 0.05 : 0;

  // 5. المجموع النهائي
  const finalTotal = itemSubtotal + shippingFee - shippingDiscount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
      <h2 className="text-lg font-bold mb-4 text-gray-900">
        Order summary ({selectedCount} items)
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4 border-b border-gray-200 pb-4">
        <div className="flex justify-between">
          <span>Item subtotal</span>
          <span className="font-bold text-gray-900">
            JOD {itemSubtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping fee</span>
          <span className="font-bold text-gray-900">
            JOD {shippingFee.toFixed(2)}
          </span>
        </div>
        {shippingDiscount > 0 && (
          <div className="flex justify-between text-red-500">
            <span>Shipping discount</span>
            <span className="font-bold">
              - JOD {shippingDiscount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center font-bold text-xl mb-4 text-gray-900">
        <span>Subtotal</span>
        <span>JOD {finalTotal.toFixed(2)}</span>
      </div>

      {shippingDiscount > 0 && (
        <div className="bg-orange-50 text-[#E65A00] text-sm p-3 rounded-md mb-4 font-medium border border-orange-100">
          JOD {shippingDiscount.toFixed(2)} saved{" "}
          <span className="text-gray-600 font-normal">on your order</span>
        </div>
      )}

      {/* تعطل زر الدفع إذا لم يحدد المستخدم أي منتج */}
      <button
        disabled={selectedCount === 0}
        className="w-full bg-[#E65A00] hover:bg-[#c94f00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full mb-6 transition-colors cursor-pointer flex justify-center items-center gap-2"
      >
        <span>✔️</span> Check out
      </button>
    </div>
  );
}
