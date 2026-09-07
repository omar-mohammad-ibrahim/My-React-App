import { ShieldCheck, MessageCircle } from "lucide-react";

export default function ActionCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
      <h3 className="font-bold text-gray-900 mb-4 text-lg">Start your order</h3>

      <div className="flex justify-between items-center text-sm mb-6 pb-4 border-b border-gray-100">
        <span className="text-gray-500 font-medium">Min. order:</span>
        <span className="font-bold text-gray-900">{product.moq} pieces</span>
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] text-white font-bold py-3 rounded-full transition-all duration-200 shadow-[0_4px_14px_0_rgba(235,91,0,0.39)] hover:shadow-[0_6px_20px_rgba(235,91,0,0.23)]">
          Start order
        </button>
        <button className="w-full bg-white hover:bg-orange-50 text-[#eb5b00] border border-[#eb5b00] font-bold py-3 rounded-full transition-colors duration-200">
          Add to cart
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold py-3 rounded-full transition-colors duration-200 mt-2">
          <MessageCircle className="w-5 h-5" />
          Chat now
        </button>
      </div>

      <div className="mt-6 pt-4 bg-green-50/50 p-4 rounded-lg border border-green-100">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-1">
              Secure payments
            </strong>
            Every payment on NexusTrade is secured with strict encryption
            protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
