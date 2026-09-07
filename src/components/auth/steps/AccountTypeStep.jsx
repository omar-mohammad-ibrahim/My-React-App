import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { BsBoxSeam } from "react-icons/bs";
import { BiStore } from "react-icons/bi";

export default function AccountTypeStep({ onSelectRole, onBackToLogin }) {
  const { t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState("Buyer");

  const handleContinue = () => {
    onSelectRole(selectedRole);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-start leading-tight">
        {t("auth.whichAccount") || "Which account type suits you best?"}
      </h1>

      <div className="flex flex-col gap-3.5 w-full mb-8">
        <div
          onClick={() => setSelectedRole("Buyer")}
          className={`relative flex items-center justify-between p-4 rounded-brand border-2 cursor-pointer transition-all ${
            selectedRole === "Buyer"
              ? "border-gray-900 bg-white shadow-xs"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Buyer"}
              onChange={() => setSelectedRole("Buyer")}
              className="mt-1 w-4 h-4 accent-gray-900 cursor-pointer"
            />
            <div className="text-start">
              <h3 className="text-sm font-bold text-gray-900">
                {t("auth.buyerTitle") || "Buyer"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 max-w-[200px]">
                {t("auth.buyerDesc") ||
                  "I want to source products and buy wholesale."}
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-orange-50 rounded-lg text-[#eb5b00]">
            <BsBoxSeam className="text-2xl" />
          </div>
        </div>

        <div
          onClick={() => setSelectedRole("Supplier")}
          className={`relative flex items-center justify-between p-4 rounded-brand border-2 cursor-pointer transition-all ${
            selectedRole === "Supplier"
              ? "border-gray-900 bg-white shadow-xs"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Supplier"}
              onChange={() => setSelectedRole("Supplier")}
              className="mt-1 w-4 h-4 accent-gray-900 cursor-pointer"
            />
            <div className="text-start">
              <h3 className="text-sm font-bold text-gray-900">
                {t("auth.supplierTitle") || "Supplier"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 max-w-[200px]">
                {t("auth.supplierDesc") ||
                  "I want to sell products and find buyers."}
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-gray-50 rounded-lg text-gray-500">
            <BiStore className="text-2xl" />
          </div>
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full py-3 text-base font-semibold rounded-full bg-[#eb5b00] hover:bg-[#d45100] text-white transition-colors"
      >
        {t("auth.continue") || "Continue"}
      </Button>

      <p className="text-xs text-gray-600 mt-6 text-center">
        {t("auth.alreadyHaveAccount") || "Already have an account?"}{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-gray-900 font-semibold underline hover:text-[#eb5b00] cursor-pointer"
        >
          {t("auth.signIn") || "Sign in"}
        </button>
      </p>
    </div>
  );
}
