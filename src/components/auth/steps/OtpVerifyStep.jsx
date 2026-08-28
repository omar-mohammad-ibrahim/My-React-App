import { useState } from "react";
import Button from "../../ui/Button";
import { BsBoxSeam } from "react-icons/bs";
import { BiStore } from "react-icons/bi";

export default function AccountTypeStep({ onSelectRole, onBackToLogin }) {
  const [selectedRole, setSelectedRole] = useState("Buyer");

  const handleContinue = () => {
    onSelectRole(selectedRole);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left leading-tight">
        Which account would you like to create?
      </h1>

      <div className="flex flex-col gap-3.5 w-full mb-8">
        {/* بطاقة المشتري (Buyer) */}
        <div
          onClick={() => setSelectedRole("Buyer")}
          className={`relative flex items-center justify-between p-4 rounded-brand border-2 cursor-pointer transition-all ${
            selectedRole === "Buyer"
              ? "border-gray-900 bg-white"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Buyer"}
              onChange={() => setSelectedRole("Buyer")}
              className="mt-1 w-4 h-4 accent-gray-900"
            />
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-900">Buyer</h3>
              <p className="text-xs text-gray-500 mt-0.5 max-w-[200px]">
                Access over 200 million products from 200,000 suppliers
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-orange-50 rounded-lg text-orange-500">
            <BsBoxSeam className="text-2xl" />
          </div>
        </div>

        {/* بطاقة التاجر (Supplier) */}
        <div
          onClick={() => setSelectedRole("Supplier")}
          className={`relative flex items-center justify-between p-4 rounded-brand border-2 cursor-pointer transition-all ${
            selectedRole === "Supplier"
              ? "border-gray-900 bg-white"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Supplier"}
              onChange={() => setSelectedRole("Supplier")}
              className="mt-1 w-4 h-4 accent-gray-900"
            />
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-900">Supplier</h3>
              <p className="text-xs text-gray-500 mt-0.5 max-w-[200px]">
                Sell your products to 40 million business buyers worldwide
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400">
            <BiStore className="text-2xl" />
          </div>
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full">
        Continue
      </Button>

      <p className="text-xs text-gray-600 mt-6 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-gray-900 font-semibold underline hover:text-primary"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
