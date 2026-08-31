import { Store } from "lucide-react";

export default function SupplierCard({ supplier }) {
  if (!supplier) return null;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
        <Store className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
          {supplier.name}
        </h3>
        <div className="text-xs text-gray-500 mt-1">
          Country:{" "}
          <span className="font-medium text-gray-700">{supplier.country}</span>
        </div>
      </div>
    </div>
  );
}
