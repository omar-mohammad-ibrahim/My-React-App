import { useState } from "react";
import { ShieldCheck, MessageCircle } from "lucide-react";
import AddToCartModal from "../cart/AddToCartModal";

export default function ActionCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-xs text-foreground">
      <h3 className="font-bold mb-4 text-lg">Start your order</h3>

      <div className="flex justify-between items-center text-sm mb-6 pb-4 border-b border-border">
        <span className="text-muted-foreground">Min. order:</span>
        <span className="font-bold">{product?.moq || 1} pieces</span>
      </div>

      <div className="flex flex-col gap-3">
        {/* زر الطلب الفوري */}
        <button
          type="button"
          className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] text-white font-bold py-3 rounded-full transition-all duration-200 cursor-pointer shadow-xs"
        >
          Start order
        </button>

        {/* زر الإضافة للسلة: يفتح الـ Drawer */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-card hover:bg-orange-50/10 text-[#eb5b00] border border-[#eb5b00] font-bold py-3 rounded-full transition-colors duration-200 cursor-pointer"
        >
          Add to cart
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground border border-border font-bold py-3 rounded-full transition-colors duration-200 mt-2 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          Chat now
        </button>
      </div>

      {/* بطاقة الضمان البصري */}
      <div className="mt-6 pt-4 bg-muted/40 p-4 rounded-lg border border-border">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-foreground font-bold block mb-1">
              Secure payments
            </strong>
            Every payment on NexusTrade is secured with strict encryption
            protocols.
          </p>
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
