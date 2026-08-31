import { Store, MapPin } from "lucide-react";

export default function SupplierCard({ supplier }) {
  // إذا لم تكن معلومات المورد موجودة، لا تعرض المكون
  if (!supplier) return null;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        Supplier Information
      </div>

      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-orange-50 group-hover:text-[#eb5b00] transition-colors">
          <Store className="w-6 h-6" />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#eb5b00] transition-colors">
            {supplier.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3" />
            <span className="font-medium text-gray-700">
              {supplier.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
