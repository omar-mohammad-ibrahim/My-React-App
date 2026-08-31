import React from "react";
import { ChevronRight } from "lucide-react";

export default function CategoriesMegaMenu() {
  return (
    <div className="absolute end-0 top-full hidden pt-4 group-hover:block z-50 w-64">
      <div className="flex h-[450px] rounded-xl border border-gray-200 bg-white shadow-2xl cursor-default overflow-hidden text-gray-900">
        <div className="w-64 flex-shrink-0 border-e border-gray-100 bg-white py-4 overflow-y-auto">
          <ul className="flex flex-col text-sm font-normal text-gray-700">
            {[
              "Apparel & Accessories",
              "Home & Garden",
              "Beauty",
              "Jewelry, Eyewear & Watches",
              "Personal Care & Home Care",
              "Consumer Electronics",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex cursor-pointer items-center justify-between px-5 py-2.5 hover:bg-gray-50 hover:text-[#eb5b00]"
              >
                <span>{item}</span>
                <ChevronRight className="h-4 w-4 text-gray-400 rtl:rotate-180" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-gray-50/50 p-6">
          <h3 className="mb-6 text-lg font-bold text-gray-900">
            Categories for you
          </h3>

          <div className="grid grid-cols-4 gap-6">
            {[
              { name: "New Cars", img: "🚗" },
              { name: "Braiding Hair", img: "💇‍♀️" },
              { name: "Headband", img: "🎀" },
              { name: "Hairpins", img: "📍" },
              { name: "Hair Jewelry", img: "✨" },
              { name: "Rubber Band", img: "➰" },
            ].map((cat, i) => (
              <div
                key={i}
                className="flex cursor-pointer flex-col items-center gap-3 group/item"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover/item:border-[#eb5b00] group-hover/item:shadow-md transition-all text-3xl">
                  {cat.img}
                </div>
                <span className="text-xs text-center font-medium text-gray-700 group-hover/item:text-[#eb5b00]">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
