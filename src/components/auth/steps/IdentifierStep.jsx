import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SocialButton from "../../ui/SocialButton";

// 1. بناء "مخطط القوانين" خارج المكون
const identifierSchema = z.object({
  // الإيميل إلزامي، ويجب أن يطابق صيغة البريد الحقيقية
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export default function IdentifierStep({ onProceed, onSocialLogin }) {
  const { t } = useTranslation();

  // 2. تهيئة محرك النماذج وربطه بقوانين Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(identifierSchema),
  });

  // 3. هذه الدالة لن تعمل أبداً إلا إذا كان الإيميل صحيحاً 100%
  const onSubmit = (data) => {
    // data.email يحتوي الآن على الإيميل النظيف
    onProceed(data.email);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-start">
        {t("auth.signInOrCreate") || "Sign in or create account"}
      </h1>

      <div className="flex flex-col gap-3 w-full">
        <SocialButton
          provider="google"
          text="Continue with Google"
          onClick={() => onSocialLogin("google")}
        />
        <SocialButton
          provider="facebook"
          text="Continue with Facebook"
          onClick={() => onSocialLogin("facebook")}
        />
        <SocialButton
          provider="linkedin"
          text="Continue with LinkedIn"
          onClick={() => onSocialLogin("linkedin")}
        />
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400">
          {t("auth.or") || "OR"}
        </span>
      </div>

      {/* 4. تسليم إدارة الحدث لمحرك handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          {/* 5. زرع أسلاك التتبع داخل الـ Input باستخدام register */}
          <Input
            placeholder={
              t("auth.emailPlaceholder") || "Enter your email address"
            }
            type="email"
            {...register("email")}
            className={
              errors.email ? "border-red-500 focus:border-red-500" : ""
            }
          />
          {/* 6. طباعة رسالة الخطأ إذا خالف المستخدم القوانين */}
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-start font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full mt-2">
          {t("auth.continue") || "Continue"}
        </Button>
      </form>
    </div>
  );
}
