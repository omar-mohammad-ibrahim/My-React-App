export default function OrderSummary({ items, selectedCount }) {
  // تصفية الأصناف المحددة فعلياً للشراء
  const selectedItems = items.filter((item) => item.selected);

  // حساب المجموع الفرعي التراكمي
  const itemSubtotal = selectedItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );

  // حساب رسوم الشحن والخصم
  const shippingFee = selectedCount > 0 ? 15.0 : 0;
  const shippingDiscount = selectedCount > 0 ? 5.0 : 0;
  const finalTotal = Math.max(0, itemSubtotal + shippingFee - shippingDiscount);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xs">
      <h2 className="text-lg font-bold text-foreground mb-4">
        Order summary ({selectedCount} {selectedCount === 1 ? "item" : "items"})
      </h2>

      {/* تفاصيل الحساب الدقيقة */}
      <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-4 border-b border-border pb-4">
        <div className="flex justify-between">
          <span>Item subtotal</span>
          <span className="font-semibold text-foreground">
            JOD {itemSubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping fee</span>
          <span className="font-semibold text-foreground">
            JOD {shippingFee.toFixed(2)}
          </span>
        </div>

        {shippingDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Shipping discount</span>
            <span className="font-semibold">
              - JOD {shippingDiscount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* الإجمالي قبل الضريبة */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-foreground text-base">
          Subtotal excl. tax
        </span>
        <span className="font-black text-xl text-foreground">
          JOD {finalTotal.toFixed(2)}
        </span>
      </div>

      {/* زر إتمام الشراء */}
      <button
        type="button"
        disabled={selectedCount === 0}
        className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-xs text-center"
      >
        Check out ({selectedCount})
      </button>
    </div>
  );
}
