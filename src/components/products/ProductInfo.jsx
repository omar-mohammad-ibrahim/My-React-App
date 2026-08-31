import { Star, CheckCircle } from "lucide-react";

export default function ProductInfo({ product }) {
  return (
    <div className="flex flex-col h-full">
      {/* العنوان والتقييم */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h1>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-medium text-gray-900">{product.rating}</span>
        </div>
        <div className="text-gray-400">|</div>
        <div className="text-gray-600 font-medium">
          {product.sold} <span className="text-gray-400 font-normal">sold</span>
        </div>
      </div>

      {/* صندوق السعر (تصميم مشابه لعلي بابا) */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
        <div className="flex items-baseline gap-1 text-[#eb5b00]">
          <span className="text-sm font-semibold">JOD</span>
          <span className="text-3xl font-bold">{product.price.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          MOQ: {product.moq} pieces
        </div>
      </div>

      {/* الوصف */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Description
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* شارة التوثيق */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-green-600 text-sm font-medium">
        <CheckCircle className="w-5 h-5" />
        Verified NexusTrade Product
      </div>
    </div>
  );
}
