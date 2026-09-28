import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),
});

export default function PasswordStep({ email, onSubmit, authError }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onValidSubmit = (data) => {
    onSubmit(data.password);
  };

  return (
    <div className="w-full flex flex-col items-start text-start">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        {t("auth.signIn", "Sign in")}
      </h1>

      <div className="w-full flex justify-end mb-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary underline cursor-pointer"
        >
          <HiOutlineSwitchHorizontal className="text-sm" />
          {t("auth.signInWithCode", "Sign in with a code")}
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="w-full flex flex-col gap-3"
      >
        {/* صندوق عرض الإيميل */}
        <div className="w-full px-3.5 py-2.5 text-sm text-foreground bg-muted/50 rounded-xl border border-border select-none">
          {email}
        </div>

        {/* حقل كلمة المرور مع زر الإظهار/الإخفاء */}
        <div className="relative w-full">
          <Input
            placeholder={t("auth.passwordPlaceholder", "Password")}
            type={showPassword ? "text" : "password"}
            error={errors.password?.message || authError}
            {...register("password")}
            className="pe-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            {showPassword ? (
              <FiEyeOff className="text-lg" />
            ) : (
              <FiEye className="text-lg" />
            )}
          </button>
        </div>

        <div className="flex justify-end mt-1">
          <a
            href="#forgot"
            className="text-xs text-muted-foreground hover:text-primary underline font-medium"
          >
            {t("auth.forgotPassword", "Forgot password?")}
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full h-11 text-base mt-2"
        >
          {t("auth.continue", "Continue")}
        </Button>
      </form>
    </div>
  );
}
