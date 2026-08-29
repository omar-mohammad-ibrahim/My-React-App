import AuthHeader from "../components/auth/AuthHeader";
import AuthBanner from "../components/auth/AuthBanner";
import AuthContainer from "../components/auth/AuthContainer";
import { BsQrCode } from "react-icons/bs";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans">
      <AuthHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        {/* العمود الأيسر: البنر */}
        <div className="hidden lg:flex w-auto justify-end">
          <AuthBanner />
        </div>

        {/* العمود الأيمن: الفورم مع QR Code */}
        <div className="w-full max-w-sm flex flex-col">
          <AuthContainer />

          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <BsQrCode className="text-sm" />
              Sign in with QR code
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-400">
        © 2026 NexusTrade. All rights reserved.
      </footer>
    </div>
  );
}
