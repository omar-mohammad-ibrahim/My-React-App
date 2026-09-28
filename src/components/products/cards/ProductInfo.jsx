import { Star, CheckCircle } from "lucide-react";

export default function ProductInfo({ product }) {
  const price = Number(product?.price) || 0;

  return (
    <div className="lg:col-span-5 bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs flex flex-col">
      <div className="flex flex-col h-full text-foreground">
        {/* عنوان المنتج */}
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
          {product?.title}
        </h1>

        {/* التقييمات والمبيعات */}
        <div className="flex items-center gap-4 mb-5 text-sm">
          {product?.rating && (
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-foreground">
                {product.rating}
              </span>
            </div>
          )}
          {product?.rating && product?.sold && (
            <div className="text-border select-none">|</div>
          )}
          {product?.sold && (
            <div className="text-foreground font-medium">
              {product.sold}{" "}
              <span className="text-muted-foreground font-normal">sold</span>
            </div>
          )}
        </div>

        {/* صندوق السعر والحد الأدنى */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6 transition-colors">
          <div className="flex items-baseline gap-1 text-primary">
            <span className="text-sm font-semibold">JOD</span>
            <span className="text-3xl font-bold">{price.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-2 font-medium">
            Minimum Order Quantity (MOQ):{" "}
            <span className="text-foreground font-semibold">
              {product?.moq || 1} {product?.unit || "pieces"}
            </span>
          </div>
        </div>

        {/* الوصف */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-foreground mb-2">
            Product Description
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {product?.description}
          </p>
        </div>

        {/* شارة التوثيق */}
        <div className="mt-auto pt-4 border-t border-border flex items-center gap-2 text-success text-sm font-bold bg-success/10 p-3 rounded-lg w-fit">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Verified by NexusTrade</span>
        </div>
      </div>
    </div>
  );
}
