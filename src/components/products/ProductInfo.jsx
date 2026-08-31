import { Star, CheckCircle } from "lucide-react";

export default function ProductInfo({ product }) {
  return (
    <div className="flex flex-col h-full">
      {/* عنوان المنتج */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">
        {product.title}
      </h1>

      {/* التقييمات والمبيعات */}
      <div className="flex items-center gap-4 mb-5 text-sm">
        {product.rating && (
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-gray-900">{product.rating}</span>
          </div>
        )}
        {product.rating && product.sold && (
          <div className="text-gray-300">|</div>
        )}
        {product.sold && (
          <div className="text-gray-900 font-medium">
            {product.sold}{" "}
            <span className="text-gray-500 font-normal">sold</span>
          </div>
        )}
      </div>

      {/* صندوق السعر والحد الأدنى */}
      <div className="bg-[#fff7f2] border border-[#ffe0cc] rounded-xl p-5 mb-6">
        <div className="flex items-baseline gap-1 text-[#eb5b00]">
          <span className="text-sm font-semibold">JOD</span>
          <span className="text-3xl font-bold">{product.price.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-600 mt-2 font-medium">
          Minimum Order Quantity (MOQ):{" "}
          <span className="text-gray-900">{product.moq} pieces</span>
        </div>
      </div>

      {/* الوصف */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-2">
          Product Description
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* شارة التوثيق */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-green-700 text-sm font-bold bg-green-50 p-3 rounded-lg w-fit">
        <CheckCircle className="w-5 h-5" />
        Verified by NexusTrade
      </div>
    </div>
  );
}
