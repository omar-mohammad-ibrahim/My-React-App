import { ShieldCheck, MessageCircle } from "lucide-react";

export default function ActionCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Start your order</h3>

      <div className="text-sm text-gray-600 mb-6">
        <div className="flex justify-between mb-2">
          <span>Min. order</span>
          <span className="font-medium text-gray-900">
            {product.moq} pieces
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] text-white font-bold py-3 rounded-full transition-colors shadow-md">
          Start order
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-[#eb5b00] border border-[#eb5b00] font-bold py-3 rounded-full transition-colors">
          Add to cart
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-semibold py-3 rounded-full transition-colors mt-2">
          <MessageCircle className="w-4 h-4" />
          Chat now
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p>
            <strong className="text-gray-900">Secure payments</strong>
            <br />
            Every payment is secured with strict encryption protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
