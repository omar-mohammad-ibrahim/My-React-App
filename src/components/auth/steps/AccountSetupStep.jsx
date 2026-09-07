import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiCheck, FiInfo } from "react-icons/fi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

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
  const typeCount = [hasLetters, hasNumbers, hasSpecial].filter(Boolean).length;
  const isTypesValid = typeCount >= 2;

  const hasEmoji = /\p{Extended_Pictographic}/u.test(passwordValue);
  const isNoEmojiValid = passwordValue.length > 0 && !hasEmoji;

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
    <div className="w-full flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-start">
        Set up your account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="w-full text-start">
          <div className="relative border border-gray-300 rounded-lg px-3.5 pt-2 pb-1.5 focus-within:border-gray-900 transition-colors">
            <label className="block text-[11px] text-gray-500 font-medium">
              Select country<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg">🇯🇴</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-900 outline-hidden cursor-pointer"
              >
                <option value="Jordan">Jordan</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Egypt">Egypt</option>
                <option value="Palestine">Palestine</option>
              </select>
            </div>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-gray-500 mt-1.5">
            Note that your country/region cannot be changed later
            <FiInfo className="text-gray-400 text-xs" />
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div>
            <div className="relative border border-gray-300 rounded-lg px-3.5 pt-2 pb-1.5 focus-within:border-gray-900 transition-colors bg-white">
              <label className="block text-[11px] text-gray-500 font-medium text-start">
                First name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="First name"
                {...register("firstName")}
                className="w-full text-sm text-gray-900 font-medium outline-hidden bg-transparent"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-[11px] mt-1 text-start">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative border border-gray-300 rounded-lg px-3.5 pt-2 pb-1.5 focus-within:border-gray-900 transition-colors bg-white">
              <label className="block text-[11px] text-gray-500 font-medium text-start">
                Last name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
                className="w-full text-sm text-gray-900 font-medium outline-hidden bg-transparent"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-[11px] mt-1 text-start">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="relative border border-gray-300 rounded-lg px-3.5 pt-2 pb-1.5 focus-within:border-gray-900 transition-colors bg-white">
            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full text-sm text-gray-900 font-medium outline-hidden bg-transparent py-1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full text-start text-xs mt-1">
          <div
            className={`flex items-start gap-2 ${isLengthValid ? "text-green-600" : "text-gray-500"}`}
          >
            {isLengthValid ? (
              <FiCheck className="text-sm text-green-600 mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-gray-400 mt-0.5">•</span>
            )}
            <span className="leading-tight">
              Your password must be between 6 and 20 characters long
            </span>
          </div>

          <div
            className={`flex items-start gap-2 ${isTypesValid ? "text-green-600" : "text-gray-500"}`}
          >
            {isTypesValid ? (
              <FiCheck className="text-sm text-green-600 mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-gray-400 mt-0.5">•</span>
            )}
            <span className="leading-tight">
              Include at least two of the following: letters, numbers, and
              special characters
            </span>
          </div>

          <div
            className={`flex items-start gap-2 ${isNoEmojiValid ? "text-green-600" : "text-gray-500"}`}
          >
            {isNoEmojiValid ? (
              <FiCheck className="text-sm text-green-600 mt-0.5 shrink-0" />
            ) : (
              <span className="text-xs text-gray-400 mt-0.5">•</span>
            )}
            <span className="leading-tight">
              Symbols such as emojis are not supported
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isPasswordFullyValid || isSubmitting}
          className={`w-full mt-6 py-3 text-base font-semibold rounded-full transition-all ${
            isPasswordFullyValid
              ? "bg-[#eb5b00] hover:bg-[#d45100] text-white cursor-pointer shadow-md"
              : "bg-[#f5b896] text-white cursor-not-allowed border-none"
          }`}
        >
          {isSubmitting ? "Setting up..." : "Confirm"}
        </Button>
      </form>
    </div>
  );
}
