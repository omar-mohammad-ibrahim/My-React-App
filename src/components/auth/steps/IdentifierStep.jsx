import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SocialButton from "../../ui/SocialButton";

const identifierSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export default function IdentifierStep({
  onProceed,
  onSocialLogin,
  isLoading,
}) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(identifierSchema),
  });

  const onSubmit = (data) => {
    onProceed(data.email);
  };

  return (
    <div className="w-full flex flex-col text-start">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        {t("auth.signInOrCreate", "Sign in or create account")}
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
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-card px-3 text-xs font-semibold text-muted-foreground uppercase">
          {t("auth.or", "OR")}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            placeholder={t("auth.emailPlaceholder", "Enter your email address")}
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full h-11 text-base mt-2"
        >
          {t("auth.continue", "Continue")}
        </Button>
      </form>
    </div>
  );
}
