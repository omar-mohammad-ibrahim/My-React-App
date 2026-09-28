import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

// أيقونات تسجيل الدخول الاجتماعي
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

// مكونات الواجهة المشتركة و shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/Button";

// خدمات المصادقة وريدكس
import { loginUser, logout } from "@/features/auth/authSlice";
import { authService } from "@/services/authService";

export default function ProfileDropdown() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const userName =
    user?.firstName || user?.displayName?.split(" ")[0] || "User";

  // دالة تسجيل الدخول الاجتماعي
  const handleSocialLogin = async (providerName) => {
    try {
      const { user: socialUser, role } =
        await authService.socialLogin(providerName);

      dispatch(
        loginUser({
          uid: socialUser.uid,
          email: socialUser.email,
          displayName: socialUser.displayName || "User",
          photoURL: socialUser.photoURL || "",
          token: socialUser.accessToken,
          role: role,
          country: "Jordan",
        }),
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Social login failed: ", error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* زر التفعيل الظاهر في شريط التنقل */}
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="User Account"
          className="flex items-center gap-1.5 p-1 text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <User className="h-[22px] w-[22px]" strokeWidth={1.5} />
          <div className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-xs font-semibold max-w-[85px] truncate">
              {!isAuthenticated ? t("navbar.signIn") || "Sign in" : userName}
            </span>
          </div>
        </button>
      </PopoverTrigger>

      {/* محتوى القائمة المنبثقة */}
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[310px] rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        <div className="flex flex-col">
          {/* قسم تسجيل الدخول (في حال لم يكن مسجلاً) */}
          {!isAuthenticated && (
            <div className="p-5 pb-4 border-b border-border text-start">
              <h4 className="text-sm font-bold text-foreground mb-3">
                {t("navbar.signInToContinue") || "Sign back in to continue"}
              </h4>

              <Button
                to="/auth"
                variant="primary"
                onClick={() => setIsOpen(false)}
                className="w-full h-10 rounded-full text-sm font-semibold shadow-sm"
              >
                {t("navbar.signIn") || "Sign in"}
              </Button>

              <div className="mt-4 text-center">
                <span className="text-xs text-muted-foreground">
                  {t("navbar.orContinueWith") || "Or, continue with:"}
                </span>

                {/* أزرار التواصل الاجتماعي */}
                <div className="flex justify-center gap-3 mt-3 mb-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("facebook")}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border shadow-xs hover:bg-muted transition-colors cursor-pointer"
                  >
                    <FaFacebook className="text-lg text-[#1877F2]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border shadow-xs hover:bg-muted transition-colors cursor-pointer"
                  >
                    <FcGoogle className="text-lg" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("linkedin")}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border shadow-xs hover:bg-muted transition-colors cursor-pointer"
                  >
                    <FaLinkedin className="text-lg text-[#0A66C2]" />
                  </button>
                </div>

                <p className="text-[11px] text-muted-foreground leading-tight">
                  By signing in via social media, I agree to{" "}
                  <Link
                    to="#"
                    className="underline hover:text-primary transition-colors"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="underline hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {/* قسم معلومات المستخدم (في حال كان مسجلاً) */}
          {isAuthenticated && (
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-border bg-muted/30">
              <span className="font-bold text-sm text-foreground truncate max-w-[190px]">
                {t("navbar.welcome") || "Hi,"} {userName}
              </span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                Seed
              </span>
            </div>
          )}

          {/* روابط التنقل السريع */}
          <ul className="py-2 flex flex-col text-start">
            {[
              {
                to: "/profile",
                label: t("navbar.myNexusTrade") || "My NexusTrade",
              },
              { to: "/orders", label: t("navbar.orders") || "Orders" },
              { to: "/messages", label: t("navbar.messages") || "Messages" },
              { to: "/rfqs", label: "RFQs" },
              ...(isAuthenticated
                ? [{ to: "/dropshipping", label: "Dropshipping" }]
                : []),
              { to: "/favorites", label: t("navbar.favorites") || "Favorites" },
              { to: "/profile", label: t("navbar.account") || "Account" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-2 text-xs font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* زر تسجيل الخروج في الأسفل للمستخدم المسجل */}
          {isAuthenticated && (
            <div className="p-2 border-t border-border bg-muted/20">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer text-start"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("navbar.signOut") || "Sign out"}</span>
              </button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
