import { useState } from "react";
import { ShieldCheck, MessageCircle } from "lucide-react";
import AddToCartModal from "../cart/AddToCartModal";
import Button from "../ui/Button";

export default function ActionCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs">
      <h3 className="font-bold mb-4 text-lg text-foreground">
        Start your order
      </h3>

      {/* الحد الأدنى للطلب */}
      <div className="flex justify-between items-center text-sm mb-6 pb-4 border-b border-border">
        <span className="text-muted-foreground">Min. order:</span>
        <span className="font-bold text-foreground">
          {product?.moq || 1} {product?.unit || "pieces"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* زر الطلب الفوري: النمط الأساسي للعلامة التجارية */}
        <Button variant="primary" className="w-full py-3.5">
          Start order
        </Button>

        {/* زر فتح مودال السلة: نمط الإطار الخارجي المتصل بـ primary */}
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3.5"
        >
          Add to cart
        </Button>

        {/* زر المحادثة: النمط الثانوي المحايد */}
        <Button
          variant="secondary"
          className="w-full py-3.5 border border-border"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span>Chat now</span>
        </Button>
      </div>

      {/* بطاقة الأمان والضمان */}
      <div className="mt-6 pt-4 bg-muted/40 p-4 rounded-lg border border-border">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-foreground font-bold block mb-1">
              Secure payments
            </strong>
            <p>
              Every payment on NexusTrade is secured with strict encryption
              protocols.
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
