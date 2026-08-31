import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

// 1. استيراد الأيقونات من مكتبة react-icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

// 2. استيراد خدمات المصادقة والـ Redux Actions
import { loginUser, logout } from "../../../features/auth/authSlice";
import { authService } from "../../../services/authService";

export default function ProfileDropdown() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userName =
    user?.firstName || user?.displayName?.split(" ")[0] || "User";

  // 3. دالة تسجيل الدخول الاجتماعي (نفس المنطق المستخدم في AuthContainer)
  const handleSocialLogin = async (providerName) => {
    try {
      const { user, role } = await authService.socialLogin(providerName);

      // تجهيز البيانات وإرسالها إلى Redux
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "",
          token: user.accessToken,
          role: role,
          country: "Jordan",
        }),
      );
    } catch (error) {
      console.error("Social login failed: ", error.message);
    }
  };

  return (
    <div className="group relative flex cursor-pointer items-center gap-2 hover:text-[#eb5b00] h-full py-4">
      <User className="h-6 w-6" strokeWidth={1.5} />

      <div className="flex flex-col justify-center">
        {!isAuthenticated ? (
          <span className="text-sm font-medium">
            {t("navbar.signIn") || "Sign in"}
          </span>
        ) : (
          <span className="text-sm font-medium truncate max-w-[80px]">
            {userName}
          </span>
        )}
      </div>

      <div className="absolute end-0 top-[100%] hidden group-hover:block z-50 w-[300px] pt-1">
        <div className="rounded-lg border border-gray-200 bg-white shadow-xl cursor-default text-gray-900 overflow-hidden">
          {!isAuthenticated && (
            <>
              <div className="p-5 pb-3">
                <h4 className="text-[15px] font-bold mb-4 text-gray-900">
                  {t("navbar.signInToContinue") || "Sign back in to continue"}
                </h4>
                <Link to="/auth">
                  <button className="w-full bg-[#eb5b00] text-white py-2.5 rounded-full font-bold hover:bg-[#d45100] transition-colors cursor-pointer">
                    {t("navbar.signIn") || "Sign in"}
                  </button>
                </Link>

                <div className="mt-4 text-center">
                  <span className="text-[13px] text-gray-500">
                    Or, continue with:
                  </span>

                  {/* أزرار الدخول الاجتماعي المربوطة بالدالة */}
                  <div className="flex justify-center gap-4 mt-3 mb-4">
                    <button
                      onClick={() => handleSocialLogin("facebook")}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <FaFacebook className="text-xl text-[#1877F2]" />
                    </button>

                    <button
                      onClick={() => handleSocialLogin("google")}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <FcGoogle className="text-xl" />
                    </button>

                    <button
                      onClick={() => handleSocialLogin("linkedin")}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <FaLinkedin className="text-xl text-[#0A66C2]" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-tight px-1">
                    By signing in via social media, I agree to{" "}
                    <Link to="#" className="underline hover:text-[#eb5b00]">
                      the Alibaba.com Free Membership Agreement
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className="underline hover:text-[#eb5b00]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <hr className="border-gray-100" />
            </>
          )}

          {isAuthenticated && (
            <>
              <div className="px-5 py-4 flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">
                  Hi, {userName}
                </span>
                <span className="bg-[#14958f] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  Seed
                </span>
              </div>
              <hr className="border-gray-100" />
            </>
          )}

          <ul className="py-2 flex flex-col">
            <Link
              to="/profile"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              My Alibaba
            </Link>
            <Link
              to="/orders"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              Orders
            </Link>
            <Link
              to="/messages"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              Messages
            </Link>
            <Link
              to="/rfqs"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              RFQs
            </Link>
            {isAuthenticated && (
              <Link
                to="/dropshipping"
                className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
              >
                Dropshipping
              </Link>
            )}
            <Link
              to="/favorites"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors"
            >
              Account
            </Link>
          </ul>

          {isAuthenticated && (
            <>
              <hr className="border-gray-100 mx-5 my-1" />
              <div className="py-2 mb-1">
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#eb5b00] transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
