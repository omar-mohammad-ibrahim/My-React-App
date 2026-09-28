import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { BsBoxSeam } from "react-icons/bs";
import { BiStore } from "react-icons/bi";

export default function AccountTypeStep({ onSelectRole, onBackToLogin }) {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("Buyer");

  return (
    <div className="w-full flex flex-col text-start">
      <h1 className="text-2xl font-bold text-foreground mb-6 leading-tight">
        {t("auth.whichAccount", "Which account type suits you best?")}
      </h1>

      <div className="flex flex-col gap-3.5 w-full mb-8">
        {/* خيار Buyer */}
        <div
          onClick={() => setSelectedRole("Buyer")}
          className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedRole === "Buyer"
              ? "border-primary bg-primary/5 shadow-xs"
              : "border-border hover:border-border/80 bg-card"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Buyer"}
              onChange={() => setSelectedRole("Buyer")}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            />
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {t("auth.buyerTitle", "Buyer")}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px]">
                {t(
                  "auth.buyerDesc",
                  "I want to source products and buy wholesale.",
                )}
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <BsBoxSeam className="text-2xl" />
          </div>
        </div>

        {/* خيار Supplier */}
        <div
          onClick={() => setSelectedRole("Supplier")}
          className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedRole === "Supplier"
              ? "border-primary bg-primary/5 shadow-xs"
              : "border-border hover:border-border/80 bg-card"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "Supplier"}
              onChange={() => setSelectedRole("Supplier")}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            />
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {t("auth.supplierTitle", "Supplier")}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px]">
                {t(
                  "auth.supplierDesc",
                  "I want to sell products and find buyers.",
                )}
              </p>
            </div>
          </div>
          <div className="p-2.5 bg-muted rounded-xl text-muted-foreground">
            <BiStore className="text-2xl" />
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={() => onSelectRole(selectedRole)}
        className="w-full h-11 text-base font-semibold"
      >
        {t("auth.continue", "Continue")}
      </Button>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        {t("auth.alreadyHaveAccount", "Already have an account?")}{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-foreground font-semibold underline hover:text-primary cursor-pointer"
        >
          {t("auth.signIn", "Sign in")}
        </button>
      </p>
    </div>
  );
}
