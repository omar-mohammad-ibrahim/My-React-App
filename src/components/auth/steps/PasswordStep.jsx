import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),
});

export default function PasswordStep({
  email,
  onSubmit,
  onSwitchToRegister,
  authError,
}) {
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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {t("auth.signIn") || "Sign in"}
      </h1>

      <div className="w-full flex justify-end mb-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-primary underline"
        >
          <HiOutlineSwitchHorizontal className="text-sm" />
          {t("auth.signInWithCode") || "Sign in with a code"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="w-full px-3.5 py-3 text-sm text-gray-800 bg-blue-50/50 rounded-brand border border-gray-200 text-start select-none">
          {email}
        </div>

        <div>
          <div className="relative w-full">
            <Input
              placeholder={t("auth.passwordPlaceholder") || "Password"}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`pe-10 ${errors.password ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-e-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 text-start font-medium">
              {errors.password.message}
            </p>
          )}

          {authError && (
            <p className="text-red-500 text-xs mt-1.5 text-start font-medium">
              {authError}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-1">
          <a
            href="#forgot"
            className="text-xs text-gray-800 hover:text-primary underline font-medium"
          >
            {t("auth.forgotPassword") || "Forgot password?"}
          </a>
        </div>

        <Button type="submit" className="w-full mt-2">
          {t("auth.continue") || "Continue"}
        </Button>
      </form>

      <div className="relative w-full my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400 uppercase">
          OR
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full"></div>
    </div>
  );
}
