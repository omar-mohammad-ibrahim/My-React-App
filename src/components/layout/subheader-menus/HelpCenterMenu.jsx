import React from "react";
import { ArrowRight } from "lucide-react";

export default function HelpCenterMenu() {
  const menuItems = [
    "Buyer Help Center",
    "Live chat with customer support",
    "File a trade dispute",
    "Refunds & after-sales",
    "Report IP infringement",
    "Report a violation",
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden pt-4 group-hover:block z-50 w-64">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl cursor-default text-gray-900">
        <div className="grid grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex cursor-pointer items-center justify-between group/item hover:text-[#eb5b00]"
            >
              <span className="text-sm font-medium">{item}</span>
              <ArrowRight className="h-4 w-4 text-transparent group-hover/item:text-[#eb5b00] rtl:rotate-180 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
