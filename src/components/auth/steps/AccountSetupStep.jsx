import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { FiCheck, FiInfo } from "react-icons/fi";
import Button from "../../ui/Button";

const setupSchema = z.object({
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export default function AccountSetupStep({ onComplete, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState("Jordan");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      country: "Jordan",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const passwordValue = watch("password", "");

  const isLengthValid = passwordValue.length >= 6 && passwordValue.length <= 20;
  const hasLetters = /[a-zA-Z]/.test(passwordValue);
  const hasNumbers = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^a-zA-Z0-9]/.test(passwordValue);
  const isTypesValid =
    [hasLetters, hasNumbers, hasSpecial].filter(Boolean).length >= 2;
  const isNoEmojiValid =
    passwordValue.length > 0 &&
    !/\p{Extended_Pictographic}/u.test(passwordValue);
  const isPasswordFullyValid = isLengthValid && isTypesValid && isNoEmojiValid;

  const onSubmit = (data) => {
    if (!isPasswordFullyValid) return;
    onComplete({
      country: selectedCountry,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      password: data.password,
    });
  };

  return (
    <div className="w-full flex flex-col items-start text-start">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        {t("auth.setupTitle", "Set up your account")}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {/* اختيار الدولة */}
        <div className="w-full">
          <div className="relative border border-border bg-background rounded-xl px-3.5 pt-2 pb-1.5 focus-within:border-primary transition-colors">
            <label className="block text-[11px] text-muted-foreground font-medium">
              {t("auth.selectCountry", "Select country")}{" "}
              <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg">🇯🇴</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-foreground outline-none cursor-pointer"
              >
                <option value="Jordan">Jordan</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Egypt">Egypt</option>
                <option value="Palestine">Palestine</option>
              </select>
            </div>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5">
            <span>
              {t(
                "auth.countryNotice",
                "Note that your country/region cannot be changed later",
              )}
            </span>
            <FiInfo className="text-muted-foreground text-xs shrink-0" />
          </p>
        </div>

        {/* الاسم الأول والأخير */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div>
            <div className="relative border border-border bg-background rounded-xl px-3.5 pt-2 pb-1.5 focus-within:border-primary transition-colors">
              <label className="block text-[11px] text-muted-foreground font-medium">
                {t("auth.firstName", "First name")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder={t("auth.firstName", "First name")}
                {...register("firstName")}
                className="w-full text-sm text-foreground font-medium outline-none bg-transparent"
              />
            </div>
            {errors.firstName && (
              <p className="text-destructive text-[11px] mt-1 font-medium">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative border border-border bg-background rounded-xl px-3.5 pt-2 pb-1.5 focus-within:border-primary transition-colors">
              <label className="block text-[11px] text-muted-foreground font-medium">
                {t("auth.lastName", "Last name")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder={t("auth.lastName", "Last name")}
                {...register("lastName")}
                className="w-full text-sm text-foreground font-medium outline-none bg-transparent"
              />
            </div>
            {errors.lastName && (
              <p className="text-destructive text-[11px] mt-1 font-medium">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* كلمة المرور */}
        <div className="w-full">
          <div className="relative border border-border bg-background rounded-xl px-3.5 py-2.5 focus-within:border-primary transition-colors">
            <input
              type="password"
              placeholder={t("auth.createPassword", "Create a password")}
              {...register("password")}
              className="w-full text-sm text-foreground font-medium outline-none bg-transparent"
            />
          </div>
        </div>

        {/* معايير كلمة المرور */}
        <div className="flex flex-col gap-2 w-full text-xs mt-1">
          <div
            className={`flex items-start gap-2 ${isLengthValid ? "text-success" : "text-muted-foreground"}`}
          >
            {isLengthValid ? (
              <FiCheck className="text-sm text-success mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-muted-foreground mt-0.5">•</span>
            )}
            <span className="leading-tight">
              {t(
                "auth.pwdRuleLength",
                "Your password must be between 6 and 20 characters long",
              )}
            </span>
          </div>

          <div
            className={`flex items-start gap-2 ${isTypesValid ? "text-success" : "text-muted-foreground"}`}
          >
            {isTypesValid ? (
              <FiCheck className="text-sm text-success mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-muted-foreground mt-0.5">•</span>
            )}
            <span className="leading-tight">
              {t(
                "auth.pwdRuleTypes",
                "Include at least two of the following: letters, numbers, and special characters",
              )}
            </span>
          </div>

          <div
            className={`flex items-start gap-2 ${isNoEmojiValid ? "text-success" : "text-muted-foreground"}`}
          >
            {isNoEmojiValid ? (
              <FiCheck className="text-sm text-success mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-muted-foreground mt-0.5">•</span>
            )}
            <span className="leading-tight">
              {t(
                "auth.pwdRuleEmoji",
                "Symbols such as emojis are not supported",
              )}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!isPasswordFullyValid || isSubmitting}
          className="w-full mt-6 h-11 text-base"
        >
          {isSubmitting
            ? t("auth.settingUp", "Setting up...")
            : t("auth.confirm", "Confirm")}
        </Button>
      </form>
    </div>
  );
}
