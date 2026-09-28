import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addToCart, syncCartToFirebase } from "../../features/cart/cartSlice";
import Button from "../ui/Button";

export default function AddToCartModal({ product, isOpen, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const currentCart = useSelector((state) => state.cart.items);
  const currentCurrency = localStorage.getItem("appCurrency") || "JOD";

  const moq = Number(product?.moq) || 1;
  const unitPrice = Number(product?.price) || 0;

  const [quantity, setQuantity] = useState(moq);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(Number(product.moq) || 1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const subtotal = (unitPrice * quantity).toFixed(2);
  const unitLabel = product.unit
    ? t(`cart.units.${product.unit}`, product.unit)
    : t("cart.units.box", "box");

  const handleDecrease = () => {
    if (quantity > moq) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleConfirmAddToCart = async () => {
    setIsSaving(true);

    const cartPayload = {
      id: product.id,
      productId: product.id,
      title: product.title || product.name,
      price: unitPrice,
      quantity,
      moq,
      unit: product.unit || "box",
      images: product.images?.length > 0 ? product.images : [product.image],
      selected: true,
    };

    dispatch(addToCart(cartPayload));

    if (user?.uid) {
      const existingIndex = currentCart.findIndex(
        (item) => item.id === cartPayload.id,
      );
      let updatedItems;

      if (existingIndex > -1) {
        updatedItems = currentCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedItems = [...currentCart, cartPayload];
      }

      await dispatch(
        syncCartToFirebase({ userId: user.uid, items: updatedItems }),
      );
    }

    setIsSaving(false);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-card text-foreground w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto border-s border-border text-start"
      >
        <div>
          <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-bold">
              {t("cart.modal.selectQuantity", "Select quantity")}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-xl font-bold cursor-pointer transition-colors p-1"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-black text-foreground">
              {currentCurrency} {unitPrice.toFixed(2)}
              <span className="text-xs text-muted-foreground font-normal ms-1">
                /{unitLabel}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("cart.modal.moqNotice", {
                moq,
                unit: unitLabel,
                defaultValue: `Minimum Order Quantity (MOQ): ${moq} ${unitLabel}`,
              })}
            </p>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-border">
            <div>
              <span className="text-sm font-semibold block">
                {t("cart.modal.quantity", "Quantity")}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("cart.modal.minUnits", {
                  moq,
                  defaultValue: `Min. ${moq} units`,
                })}
              </span>
            </div>

            <div className="flex items-center border border-border rounded-md overflow-hidden bg-card shrink-0">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= moq}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors select-none"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold bg-transparent border-x border-border select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors select-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-5">
            <span className="text-sm text-muted-foreground font-medium">
              {t("cart.modal.subtotal", "Subtotal:")}
            </span>
            <span className="text-2xl font-black text-foreground">
              {currentCurrency} {subtotal}
            </span>
          </div>

          <Button
            variant="primary"
            onClick={handleConfirmAddToCart}
            disabled={isSaving}
            className="w-full py-3.5 text-base shadow-sm"
          >
            {isSaving
              ? t("cart.modal.saving", "Saving...")
              : t("cart.modal.addToCart", "Add to cart")}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
