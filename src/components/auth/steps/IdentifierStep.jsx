import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

export default function PasswordStep({
  email,
  onSubmit,
  onSwitchToRegister,
  authError,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in</h1>

      {/* رابط التبديل لتسجيل الدخول بكود */}
      <div className="w-full flex justify-end mb-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-primary font-medium underline"
        >
          <HiOutlineSwitchHorizontal className="text-sm" />
          Sign in with a code
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        {/* حقل البريد الثابت */}
        <div className="w-full px-3.5 py-3 text-sm text-gray-800 bg-blue-50/50 rounded-brand border border-gray-200 text-left select-none">
          {email}
        </div>

        {/* حقل كلمة المرور مع أيقونة إظهار/إخفاء */}
        <div className="relative w-full">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? (
              <FiEyeOff className="text-lg" />
            ) : (
              <FiEye className="text-lg" />
            )}
          </button>
        </div>

        {/* رسالة الخطأ */}
        {authError && (
          <p className="text-danger text-xs text-left mt-0.5">{authError}</p>
        )}

        {/* رابط نسيت كلمة المرور */}
        <div className="flex justify-end">
          <a
            href="#forgot"
            className="text-xs text-gray-800 hover:text-primary underline font-medium"
          >
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full mt-2">
          Continue
        </Button>
      </form>

      {/* فاصل OR */}
      <div className="relative w-full my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400 uppercase">
          OR
        </span>
      </div>

      {/* أزرار التواصل المربعة المصغرة */}
      <div className="grid grid-cols-3 gap-3 w-full">
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border border-gray-200 rounded-brand hover:bg-gray-50 bg-gray-50/50"
        >
          <FcGoogle className="text-xl" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border border-gray-200 rounded-brand hover:bg-gray-50 bg-gray-50/50"
        >
          <FaFacebook className="text-xl text-[#1877F2]" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border border-gray-200 rounded-brand hover:bg-gray-50 bg-gray-50/50"
        >
          <FaLinkedin className="text-xl text-[#0A66C2]" />
        </button>
      </div>

      {/* الانتقال لإنشاء حساب */}
      <p className="text-xs text-gray-600 mt-8 text-center">
        New to Alibaba.com?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-gray-900 font-semibold underline hover:text-primary"
        >
          Create an account
        </button>
      </p>
    </div>
  );
}
