import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, MessageCircle } from "lucide-react";
import AddToCartModal from "@/components/cart/AddToCartModal";
import Button from "@/components/ui/Button";

export default function ActionCard({ product }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unitLabel =
    product?.unit ||
    (Number(product?.moq) > 1
      ? t("productCard.pieces", "pieces")
      : t("productCard.piece", "piece"));

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs text-start">
      <h3 className="font-bold mb-4 text-lg text-foreground">
        {t("productCard.startYourOrder", "Start your order")}
      </h3>

      {/* الحد الأدنى للطلب */}
      <div className="flex justify-between items-center text-sm mb-6 pb-4 border-b border-border">
        <span className="text-muted-foreground">
          {t("productCard.minOrderLabel", "Min. order:")}
        </span>
        <span className="font-bold text-foreground">
          {product?.moq || 1} {unitLabel}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* زر الطلب الفوري */}
        <Button variant="primary" className="w-full py-3.5 shadow-sm">
          {t("productCard.startOrder", "Start order")}
        </Button>

        {/* زر فتح مودال السلة */}
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3.5"
        >
          {t("productCard.addToCart", "Add to cart")}
        </Button>

        {/* زر المحادثة */}
        <Button
          variant="secondary"
          className="w-full py-3.5 border border-border flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span>{t("productCard.chatNow", "Chat now")}</span>
        </Button>
      </div>

      {/* بطاقة الأمان والضمان */}
      <div className="mt-6 pt-4 bg-muted/40 p-4 rounded-lg border border-border">
        <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
          <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-foreground font-bold block mb-1">
              {t("productCard.securePayments", "Secure payments")}
            </strong>
            <p>
              {t(
                "productCard.securePaymentsDesc",
                "Every payment on NexusTrade is secured with strict encryption protocols.",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* نافذة تحديد الكمية */}
      <AddToCartModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
