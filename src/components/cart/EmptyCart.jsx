import { Link } from "react-router-dom";
import BuyerProtection from "./BuyerProtection";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-8 mb-6">
        {/* صورة كرتونة فارغة بسيطة */}
        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
          📦
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">
            Your shopping cart is empty.
          </h2>
          <BuyerProtection showDetails={false} />
        </div>
      </div>

      <Link
        to="/"
        className="px-8 py-2 rounded-full border border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
      >
        Start Sourcing
      </Link>
    </div>
  );
}
