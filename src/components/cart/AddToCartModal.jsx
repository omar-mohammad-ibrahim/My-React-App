import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { syncCartToFirebase } from "../../services/cartService";

export default function AddToCartModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const currentCart = useSelector((state) => state.cart.items);

  const moq = Number(product?.moq) || 1;
  const unitPrice = Number(product?.price) || 0;

  const [quantity, setQuantity] = useState(moq);
  const [selectedVariation, setSelectedVariation] = useState("Default");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !product) return null;

  // الحساب المالي الفوري
  const subtotal = (unitPrice * quantity).toFixed(2);

  const handleDecrease = () => {
    if (quantity > moq) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleConfirmAddToCart = async () => {
    setIsSaving(true);

    const cartPayload = {
      id: `${product.id}-${selectedVariation}`,
      productId: product.id,
      title: product.title || product.name,
      price: unitPrice,
      quantity: quantity,
      moq: moq,
      unit: product.unit || "box",
      variation: selectedVariation,
      images: product.images?.length > 0 ? product.images : [product.image],
      selected: true,
    };

    // 1. التحديث الفوري في Redux
    dispatch(addToCart(cartPayload));

    // 2. المزامنة مع Firebase إذا كان المستخدم مسجل دخول
    const userUid = user?.uid;
    if (userUid) {
      const updatedItems = [
        ...currentCart.filter((item) => item.id !== cartPayload.id),
        cartPayload,
      ];
      await syncCartToFirebase(userUid, updatedItems);
    }

    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="bg-card text-foreground w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto border-l border-border">
        {/* الرأس والخيارات */}
        <div>
          <div className="flex justify-between items-center border-b border-border pb-4 mb-5">
            <h2 className="text-lg font-bold">Select variations & quantity</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-xl font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>

          {/* السعر والحد الأدنى */}
          <div className="mb-6">
            <div className="text-2xl font-black text-foreground">
              JOD {unitPrice.toFixed(2)}
              <span className="text-xs text-muted-foreground font-normal ml-1">
                /{product.unit || "box"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum Order Quantity (MOQ): {moq} {product.unit || "boxes"}
            </p>
          </div>

          {/* تحديد الخيارات (Variations) */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Options
            </label>
            <div className="flex flex-wrap gap-2">
              {["Standard", "2-way audio", "Pro Touch"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedVariation(opt)}
                  className={`px-3 py-1.5 text-xs rounded-md border cursor-pointer transition-all ${
                    selectedVariation === opt
                      ? "border-[#eb5b00] text-[#eb5b00] bg-orange-50/10 font-bold"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* محدد الكمية اليدوي */}
          <div className="flex items-center justify-between py-4 border-y border-border my-6">
            <div>
              <span className="text-sm font-semibold block">Quantity</span>
              <span className="text-xs text-muted-foreground">
                Min. {moq} units
              </span>
            </div>

            <div className="flex items-center border border-border rounded-md overflow-hidden bg-card">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= moq}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold bg-transparent">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* الشريط السفلي: الإجمالي والتأكيد */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="text-2xl font-black text-foreground">
              JOD {subtotal}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirmAddToCart}
            disabled={isSaving}
            className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] disabled:bg-muted disabled:text-muted-foreground text-white font-bold py-3.5 rounded-full transition-colors cursor-pointer text-center"
          >
            {isSaving ? "Saving..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
