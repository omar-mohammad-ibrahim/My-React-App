import AuthHeader from "../components/auth/AuthHeader";
import AuthBanner from "../components/auth/AuthBanner";
import AuthContainer from "../components/auth/AuthContainer";
import { BsQrCode } from "react-icons/bs";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans">
      {/* 1. الهيدر المصغر */}
      <AuthHeader />

      {/* 2. جسم الصفحة: تقسيم لعمودين مع محاذاة في المنتصف */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        {/* العمود الأيسر: البنر الترويجي (يختفي على الموبايل ليمنح تجربة سريعة) */}
        <div className="hidden lg:flex w-1/2 justify-end">
          <AuthBanner />
        </div>

        {/* العمود الأيمن: معالج الخطوات التفاعلي */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start max-w-md">
          <AuthContainer />

          {/* رابط تسجيل الدخول بالـ QR code في الأسفل */}
          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
            >
              <BsQrCode className="text-sm" />
              Sign in with QR code
            </button>
          </div>
        </div>
      </main>

      {/* 3. تذييل بسيط جداً للحقوق */}
      <footer className="py-4 text-center text-xs text-gray-400">
        © 2026 NexusTrade. All rights reserved.
      </footer>
    </div>
  );
}
