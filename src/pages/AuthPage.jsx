import { useTranslation } from "react-i18next";
import AuthHeader from "../components/auth/AuthHeader";
import AuthBanner from "../components/auth/AuthBanner";
import AuthContainer from "../components/auth/AuthContainer";
import { BsQrCode } from "react-icons/bs";

export default function AuthPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background text-foreground font-sans transition-colors">
      <AuthHeader />

      {/* كونتينر عريض جداً (1360px) لتوزيع المساحة بنمط علي بابا */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto px-6 sm:px-10 py-6 flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-20">
        {/* قسم البنر: أصبح يأخذ المساحة الأكبر ويتمدد بحرية حتى 720px */}
        <div className="hidden lg:flex flex-1 w-full max-w-[720px] justify-center xl:justify-start">
          <AuthBanner />
        </div>

        {/* قسم النموذج: محدد بحجم قياسي وثابت (420px) مع محاذاة مرتبة */}
        <div className="w-full max-w-[420px] flex flex-col shrink-0">
          <AuthContainer />

          <div className="w-full flex justify-end mt-3 px-1">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md py-1 px-1.5"
            >
              <BsQrCode className="text-sm shrink-0" />
              <span>{t("auth.signInQr", "Sign in with QR code")}</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-5 text-center text-xs text-muted-foreground border-t border-border/40">
        {t("auth.copyright", "© 2026 NexusTrade. All rights reserved.")}
      </footer>
    </div>
  );
}
