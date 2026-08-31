import React from "react";

export default function AboutMegaMenu() {
  return (
    <div className="absolute end-0 top-full hidden pt-4 group-hover:block z-50 w-64">
      <div className="flex h-[320px] rounded-xl border border-gray-200 bg-white shadow-2xl cursor-default overflow-hidden text-gray-900">
        <div className="w-1/3 bg-blue-50 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your shortcut to Verified factors
          </h2>
          <div className="flex gap-4 my-4 text-gray-700 font-medium">
            <div>
              <span className="block text-xl font-bold text-gray-900">
                34K+
              </span>{" "}
              Verified
            </div>
            <div>
              <span className="block text-xl font-bold text-gray-900">5K+</span>{" "}
              Industries
            </div>
            <div>
              <span className="block text-xl font-bold text-gray-900">78</span>{" "}
              Countries
            </div>
          </div>
          <button className="mt-2 w-max rounded-full border border-gray-900 px-6 py-2 text-sm font-bold hover:bg-gray-900 hover:text-white transition-colors">
            Explore now
          </button>
        </div>

        <div className="flex-1 flex gap-4 p-6 bg-white">
          <div className="flex-1 rounded-xl bg-blue-100 relative overflow-hidden group/card cursor-pointer">
            <div className="absolute end-0 top-full hidden pt-4 group-hover:block z-50 w-64">
              Smart factory search
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="flex-1 rounded-xl bg-gray-100 relative overflow-hidden group/card cursor-pointer">
            <div className="absolute bottom-4 left-4 font-bold text-gray-900 z-10 text-lg">
              Top manufacturer rankings
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-blue-50 relative overflow-hidden group/card cursor-pointer">
            <div className="absolute bottom-4 left-4 font-bold text-gray-900 z-10 text-lg">
              Factory-direct samples
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
